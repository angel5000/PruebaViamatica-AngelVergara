
/*PROCEDIMIENTOS*/

/*REGISTRAR USUARIOS */
create PROCEDURE sp_RegistrarPersonaYUsuario
    @Identificacion NVARCHAR(10),
    @Nombres NVARCHAR(60),
    @Apellidos NVARCHAR(60),
    @FechaNacimiento DATE,
    @Mail NVARCHAR(120),
    @UserName NVARCHAR(50),
    @Password NVARCHAR(50),
    @Status varCHAR(20),
	 @StatusPersona varCHAR(20),
    @SesionActive CHAR(1),
	@ROL INT,
    @PersonaId INT OUTPUT,
    @UsuarioId INT OUTPUT
AS
BEGIN
    BEGIN TRY
        -- Inicia la transacción
        BEGIN TRANSACTION;

        -- Verifica si ya existe una persona con la misma identificación
		PRINT @Identificacion;
        IF EXISTS (
            SELECT 1
            FROM Personas
            WHERE Identificacion = @Identificacion
        )
        BEGIN
            RAISERROR('El usuario ya tiene una cuenta registrada.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Inserta la nueva persona
        INSERT INTO Personas (Nombres, Apellidos, Identificacion, FechaNacimiento, [Status])
        VALUES (@Nombres, @Apellidos, @Identificacion, @FechaNacimiento, @StatusPersona);
        
        -- Obtén el ID de la persona recién insertada
        SET @PersonaId = SCOPE_IDENTITY();

        -- Inserta el nuevo usuario asociado a la persona
        INSERT INTO Usuarios (UserName, [Password], Mail, SesionActive, Persona_IdPersona2, [Status])
        VALUES (@UserName, @Password, @Mail, @SesionActive, @PersonaId, @Status);

        -- Obtén el ID del usuario recién insertado
        SET @UsuarioId = SCOPE_IDENTITY();
		INSERT INTO RolUsuarios(Rol_idRol,Usuarios_idUsuarios)
		VALUES(@ROL,@UsuarioId)
        -- Confirma la transacción
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Si ocurre un error, deshace la transacción
        ROLLBACK TRANSACTION;
        THROW; -- Lanza nuevamente el error para que sea manejado por el cliente
    END CATCH
END

/*INICIAR SESION*/
create PROCEDURE InicioSesion  
    @Login NVARCHAR(50), 
    @Password NVARCHAR(50),
    @Result INT OUTPUT,
    @Rol INT OUTPUT, 
    @UsuarioId INT OUTPUT, 
    @UserName NVARCHAR(50) OUTPUT, 
    @Mail NVARCHAR(50) OUTPUT, 
    @Nombres NVARCHAR(100) OUTPUT, 
    @Apellidos NVARCHAR(100) OUTPUT, 
    @Identificacion NVARCHAR(50) OUTPUT, 
    @FechaNacimiento DATE OUTPUT, 
    @FechaCierre DATETIME OUTPUT,
    @FechaIngreso DATETIME OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION; -- Inicia la transacción

        DECLARE @IntentosFallidos INT;
        DECLARE @Status CHAR(20);
        DECLARE @RolId INT;

        -- Obtener el status y el ID del usuario
        SELECT @Status = Status, @UsuarioId = IdUsuario
        FROM Usuarios
        WHERE UserName = @Login OR Mail = @Login;

        IF @UsuarioId IS NULL
        BEGIN
            -- Usuario no encontrado
            SET @Result = 0; -- Credenciales incorrectas
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF @Status = 'Bloqueado'
        BEGIN
            SET @Result = -1; -- Usuario bloqueado
            SET @Rol = 0;
            ROLLBACK TRANSACTION;
            RETURN;
        END
        ELSE IF @Status = 'Inactivo'
        BEGIN
            SET @Result = -2; -- Usuario inactivo
            SET @Rol = 0;
            -- Limpiar los valores de salida
            SET @UsuarioId = 0;
            SET @UserName = NULL;
            SET @Mail = NULL;
            SET @Nombres = NULL;
            SET @Apellidos = NULL;
            SET @Identificacion = NULL;
            SET @FechaNacimiento = NULL;
            SET @FechaIngreso = NULL;
            SET @FechaCierre = NULL;
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Verificar credenciales y estado activo
        IF EXISTS (
            SELECT 1
            FROM Usuarios
            WHERE (UserName = @Login OR Mail = @Login)
              AND Password = @Password
              AND Status = 'Activo'
        )
        BEGIN
            SELECT
                @Status = u.Status,
                @UsuarioId = u.IdUsuario,
                @UserName = u.UserName,
                @Mail = u.Mail,
                @Nombres = p.Nombres,
                @Apellidos = p.Apellidos,
                @Identificacion = p.Identificacion,
                @FechaNacimiento = p.FechaNacimiento,
                @FechaIngreso = (SELECT MAX(s.FechaIngreso) FROM Sessions s WHERE s.idPersona = u.IdUsuario),
                @FechaCierre = s.FechaCierre
            FROM Usuarios u
            INNER JOIN Personas p ON u.Persona_IdPersona2 = p.idPersona
            LEFT JOIN Sessions s ON u.IdUsuario = s.idPersona
            WHERE u.UserName = @Login OR u.Mail = @Login;

            -- Insertar nueva sesión
            INSERT INTO Sessions (FechaIngreso, idPersona)
            VALUES (GETDATE(), @UsuarioId);

            -- Verificar si ya tiene una sesión activa
            IF EXISTS (
                SELECT 1
                FROM Usuarios
                WHERE (UserName = @Login OR Mail = @Login)
                  AND SesionActive = 'A'
            )
            BEGIN
                SET @Result = 2; -- Sesión ya activa
                COMMIT TRANSACTION;
                RETURN;
            END

            -- Actualizar estado de sesión
            UPDATE Usuarios
            SET SesionActive = 'A'
            WHERE UserName = @Login OR Mail = @Login;

            -- Registrar sesión exitosa
            UPDATE Sessions
            SET SesionExitosa = 1
            WHERE idPersona = @UsuarioId
              AND FechaIngreso = (
                  SELECT MAX(FechaIngreso)
                  FROM Sessions
                  WHERE idPersona = @UsuarioId
              );

            -- Obtener rol del usuario
            SELECT TOP 1 @RolId = Rol_idRol
            FROM RolUsuarios
            WHERE Usuarios_idUsuarios = @UsuarioId;

            SET @Rol = @RolId;
            SET @Result = 1; -- Inicio de sesión exitoso
            COMMIT TRANSACTION; -- Confirmar los cambios
        END
        ELSE
        BEGIN
            IF @Status = 'Activo'
            BEGIN
                -- Incrementar intentos fallidos
                UPDATE Usuarios
                SET IntentosFallidos = ISNULL(IntentosFallidos, 0) + 1
                WHERE UserName = @Login OR Mail = @Login;

                -- Registrar sesión fallida
                INSERT INTO Sessions (FechaIngreso, idPersona, SesionFallida)
                VALUES (GETDATE(), @UsuarioId, 1);

                UPDATE Sessions
                SET SesionFallida = ISNULL(SesionFallida, 0) + 1
                WHERE idPersona = @UsuarioId
                  AND FechaIngreso = (
                      SELECT MAX(FechaIngreso)
                      FROM Sessions
                      WHERE idPersona = @UsuarioId
                  );

                SET @Result = -2; -- Credenciales incorrectas
				 SET @Rol = 0;
           
           
            END
           Commit TRANSACTION; 
        END
    END TRY
    BEGIN CATCH
        -- Manejar errores y asegurarse de que la transacción sea cerrada
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Opcional: registrar detalles del error
        THROW;
    END CATCH
END;

/*SESIONES-DASHBOARD */


create PROCEDURE SESIONES
    @IdPersona INT,              
    @FechaInicio DATETIME = NULL,
    @FechaFin DATETIME = NULL,    
    @NumPage INT = 1,            
    @NumRecordsPage INT = 10,    
    @Order NVARCHAR(10) = 'asc', 
    @Sort NVARCHAR(50) = 'FechaIngreso', 
    @TotalRecords INT OUTPUT    
AS
BEGIN
    SET NOCOUNT ON;


    -- Calcular el total de registros filtrados (sin paginación)
    SELECT @TotalRecords = COUNT(*)
    FROM Sessions s
    WHERE s.idPersona = @IdPersona
      AND (@FechaInicio IS NULL OR s.FechaIngreso >= @FechaInicio)
      AND (@FechaFin IS NULL OR s.FechaIngreso <= @FechaFin);

    -- Consulta con filtros y paginación
    SELECT 
        s.FechaIngreso,
        s.FechaCierre,
        s.SesionExitosa,
        s.SesionFallida,
        r.TotalFallidos,
        r.TotalRegistros,
        r.PrimeraFecha,
        r.UltimaFecha
    FROM Sessions s
    INNER JOIN (
        -- Subconsulta para calcular los totales
        SELECT 
            SUM(SesionFallida) AS TotalFallidos,
            COUNT(*) AS TotalRegistros,
            MIN(FechaIngreso) AS PrimeraFecha,
            MAX(FechaIngreso) AS UltimaFecha,
            idPersona
        FROM Sessions
        WHERE idPersona = @IdPersona
          AND (@FechaInicio IS NULL OR FechaIngreso >= @FechaInicio)  -- Filtro opcional por fecha inicio
          AND (@FechaFin IS NULL OR FechaIngreso <= @FechaFin)        -- Filtro opcional por fecha fin
        GROUP BY idPersona
    ) r ON s.idPersona = r.idPersona
    WHERE s.idPersona = @IdPersona
      AND (@FechaInicio IS NULL OR s.FechaIngreso >= @FechaInicio)  -- Filtro opcional por fecha inicio
      AND (@FechaFin IS NULL OR s.FechaIngreso <= @FechaFin)        -- Filtro opcional por fecha fin
    ORDER BY 
        CASE WHEN @Order = 'asc' THEN
            CASE WHEN @Sort = 'FechaIngreso' THEN s.FechaIngreso END
        END ASC,
        CASE WHEN @Order = 'desc' THEN 
            CASE WHEN @Sort = 'FechaIngreso' THEN s.FechaIngreso END
        END DESC
    OFFSET (@NumPage - 1) * @NumRecordsPage ROWS 
    FETCH NEXT @NumRecordsPage ROWS ONLY;
END;

/*CERRAR SESION*/


create PROCEDURE CerrarSesion
    @Login NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Actualizar el estado de la sesión del usuario
    UPDATE Usuarios
    SET SesionActive = 'I'
    WHERE UserName = @Login OR Mail = @Login;

    -- Declarar variables para almacenar datos necesarios
    DECLARE @idPersona INT;
    DECLARE @FechaIngreso DATETIME;

    -- Obtener el ID de la persona correspondiente al usuario
    SELECT @idPersona = Persona_IdPersona2 -- Ajusta según el nombre de la columna
    FROM Usuarios
    WHERE UserName = @Login OR Mail = @Login;

    -- Validar si se encontró el usuario
    IF @idPersona IS NULL
    BEGIN
        RAISERROR ('Usuario no encontrado.', 16, 1);
        RETURN;
    END;

    -- Obtener la última FechaIngreso de la sesión activa (si existe)
    SELECT TOP 1 @FechaIngreso = FechaIngreso
    FROM Sessions
    WHERE idPersona = @idPersona
    ORDER BY FechaIngreso DESC; -- Usar la última fecha de ingreso registrada


    -- Insertar en la tabla Sessions usando la FechaIngreso obtenida
  UPDATE Sessions
    SET FechaCierre = GETDATE()
    WHERE idPersona = @idPersona  AND FechaCierre IS NULL;
END;


  
  /*CONSULTA DE PERSONAS CON FILTROS APLICADOS-(ADMINISTRADOR)*/

create PROCEDURE ConsultarUsuariosYPersonasConFiltros
    @UsuarioId INT,
    @NumPage INT = 1,
    @NumRecordsPage INT = 10,
    @Order NVARCHAR(10) = 'asc',
    @Sort NVARCHAR(50) = 'idUsuario',
    @NumFilter INT = NULL,
    @TextFilter NVARCHAR(100) = NULL,
    @StateFilter varchar(20) = NULL,
    @StartDate NVARCHAR(10) = NULL,
    @EndDate NVARCHAR(10) = NULL,
    @TotalRecords INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EsAdmin INT;

    -- Verificar si el usuario es admin
    SELECT @EsAdmin = CASE WHEN Rol_idRol = 1 THEN 1 ELSE 0 END
    FROM RolUsuarios
    WHERE Usuarios_idUsuarios = @UsuarioId;

    -- Calcular total de registros filtrados
    SELECT @TotalRecords = COUNT(*)
    FROM Usuarios u
    INNER JOIN Personas p ON u.Persona_IdPersona2 = p.idPersona
    WHERE 
        (@EsAdmin = 0 OR u.idUsuario != @UsuarioId)
        AND NOT EXISTS (
            SELECT 1
            FROM RolUsuarios ru
            WHERE ru.Usuarios_idUsuarios = u.idUsuario
            AND ru.Rol_idRol = 1
        )
        AND u.Status != 'Eliminado' -- Excluir aquellos que tienen estado "Eliminado"
        AND (
            @NumFilter IS NULL 
            OR (@NumFilter = 1 AND p.Nombres LIKE '%' + @TextFilter + '%')  -- Filtrar por Nombres
            OR (@NumFilter = 2 AND u.UserName LIKE '%' + @TextFilter + '%') -- Filtrar por UserName
        )
        AND (@StateFilter IS NULL OR u.Status = @StateFilter)
        AND (@StartDate IS NULL OR p.FechaNacimiento >= CAST(@StartDate AS DATE))
        AND (@EndDate IS NULL OR p.FechaNacimiento < DATEADD(DAY, 1, CAST(@EndDate AS DATE)));

    -- Consulta con filtros y paginación
    SELECT 
        u.idUsuario,
        u.UserName,
        u.Mail,
        u.SesionActive,
        u.Status AS StatusUsuario,
        u.IntentosFallidos,
		p.idPersona,
        p.Nombres,
        p.Apellidos,
        p.Identificacion,
        p.FechaNacimiento,
        p.Status AS StatusPersona,
        @TotalRecords AS TotalRecords
    FROM 
        Usuarios u
    INNER JOIN 
        Personas p ON u.Persona_IdPersona2 = p.idPersona
    WHERE 
        (@EsAdmin = 0 OR u.idUsuario != @UsuarioId)
        AND NOT EXISTS (
            SELECT 1
            FROM RolUsuarios ru
            WHERE ru.Usuarios_idUsuarios = u.idUsuario
            AND ru.Rol_idRol = 1
        )
        AND u.Status != 'Eliminado' -- Excluir aquellos que tienen estado "Eliminado"
        AND (
            @NumFilter IS NULL 
            OR (@NumFilter = 1 AND p.Nombres LIKE '%' + @TextFilter + '%')  -- Filtrar por Nombres
            OR (@NumFilter = 2 AND u.UserName LIKE '%' + @TextFilter + '%') -- Filtrar por UserName
        )
        AND (@StateFilter IS NULL OR u.Status = @StateFilter)
        AND (@StartDate IS NULL OR p.FechaNacimiento >= CAST(@StartDate AS DATE))
        AND (@EndDate IS NULL OR p.FechaNacimiento < DATEADD(DAY, 1, CAST(@EndDate AS DATE)))
    ORDER BY 
        CASE WHEN @Order = 'asc' THEN 
            CASE WHEN @Sort = 'idUsuario' THEN u.idUsuario END
        END ASC,
        CASE WHEN @Order = 'desc' THEN 
            CASE WHEN @Sort = 'idUsuario' THEN u.idUsuario END
        END DESC
    OFFSET (@NumPage - 1) * @NumRecordsPage ROWS
    FETCH NEXT @NumRecordsPage ROWS ONLY;
END;




/*CONSULTAR POR ID */

create PROCEDURE ConsultarUsuarioPorId
    @idUsuario INT

AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.UserName, 
        u.SesionActive, 
        u.Status , 
		p.idPersona,
		u.idUsuario,
        p.Nombres, 
        p.Apellidos, 
        p.FechaNacimiento, 
        p.Status
    FROM 
        Usuarios u
    INNER JOIN 
        Personas p ON u.Persona_IdPersona2= p.IdPersona
    WHERE 
        u.IdUsuario = @idUsuario;
END






/* ACTUALIZACION DE DATOS USUARIO Y PERSONA (ADMINISTRADOR) */

create PROCEDURE ActualizarUsuarioYPersona
    @IdUsuarioAdmin INT,
	@IdUsuario INT,
    @UserName NVARCHAR(50),
    @SesionActive char(1),
    @StatusUsuario NVARCHAR(50),
    @IdPersona INT,
    @Nombres NVARCHAR(60),
    @Apellidos NVARCHAR(60),
    @FechaNacimiento DATE,
    @StatusPersona NVARCHAR(10)
AS
BEGIN
    -- Iniciar la transacción
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Verificar si el usuario tiene el rol 1
        IF NOT EXISTS (
            SELECT 1
            FROM [PRUEBAUSUARIOS].[dbo].[RolUsuarios] AS RU
            INNER JOIN [PRUEBAUSUARIOS].[dbo].[Usuarios] AS U
                ON RU.Usuarios_idUsuarios = U.idUsuario
            WHERE RU.Rol_idRol = 1
              AND U.idUsuario= @IdUsuarioAdmin
        )
        BEGIN
            RAISERROR ('Permisos insuficientes: el usuario no es admin.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Actualizar la tabla Usuarios
        UPDATE U
        SET 
            U.[UserName] = @UserName,
        
            U.[SesionActive] = @SesionActive,
            U.[Status] = @StatusUsuario
        FROM [PRUEBAUSUARIOS].[dbo].[Usuarios] AS U
        WHERE U.[idUsuario] = @IdUsuario;

        -- Verificar si la actualización en Usuarios afectó alguna fila
        IF @@ROWCOUNT = 0
        BEGIN
            RAISERROR ('No se encontró el usuario especificado.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Actualizar la tabla Personas
        UPDATE P
        SET 
            P.[Nombres] = @Nombres,
            P.[Apellidos] = @Apellidos,
           
            P.[FechaNacimiento] = @FechaNacimiento,
            P.[Status] = @StatusPersona
        FROM [PRUEBAUSUARIOS].[dbo].[Personas] AS P
        WHERE P.[idPersona] = @IdPersona;

        -- Verificar si la actualización en Personas afectó alguna fila
        IF @@ROWCOUNT = 0
        BEGIN
            RAISERROR ('No se encontró la persona especificada.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Confirmar la transacción si todo salió bien
        COMMIT TRANSACTION;

        PRINT 'Actualización realizada con éxito.';
    END TRY
    BEGIN CATCH
        -- Manejo de errores
        ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;



/*ESTADOS DE LOS USUARIOS (DASHBOARD)*/

create PROCEDURE ConsultarEstadosUsuarios
    @Filtro INT = NULL, 
    @SesionActiva CHAR(1) = NULL,
    @SesionFallida INT = NULL, 
    @Estado NVARCHAR(50) = NULL, 
    @idUsuario INT, 
    @NumPage INT = 1, 
    @NumRecordsPage INT = 10, 
    @Sort NVARCHAR(50) = 'idUsuario', 
    @Order NVARCHAR(10) = 'asc',
    @TotalRecords INT OUTPUT 
AS
BEGIN
    -- Configurar el nivel de aislamiento para evitar bloqueos en tablas grandes
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    -- Validar si el usuario tiene rol 1
    IF NOT EXISTS (
        SELECT 1
        FROM [PRUEBAUSUARIOS].[dbo].[RolUsuarios] ru
        WHERE ru.Usuarios_idUsuarios = @idUsuario AND ru.Rol_idRol = 1
    )
    BEGIN
        -- Si no tiene rol 1, devolver -1
        SELECT -1 AS Resultado;
        RETURN;
    END

    -- Declarar variables para cálculos
    DECLARE @Offset INT = (@NumPage - 1) * @NumRecordsPage;

    -- Filtro 1: Consultar última sesión
    IF @Filtro = 1
    BEGIN
	

        WITH UltimaSesion AS (
            SELECT 
                s.idPersona,
                s.FechaIngreso,
                s.FechaCierre,
                s.SesionExitosa,
                s.SesionFallida,
                ROW_NUMBER() OVER (PARTITION BY s.idPersona ORDER BY s.FechaIngreso DESC) AS RowNum
            FROM 
                [PRUEBAUSUARIOS].[dbo].[Sessions] s
        )
		   SELECT 
        @TotalRecords = COUNT(*)
    FROM 
        UltimaSesion us
    INNER JOIN 
        [PRUEBAUSUARIOS].[dbo].[Usuarios] u
    ON 
        u.idUsuario = us.idPersona
    WHERE 
        us.RowNum = 1
        AND (@SesionActiva IS NULL OR u.SesionActive = @SesionActiva)
        AND (@SesionFallida IS NULL OR us.SesionFallida = @SesionFallida)
        AND (@Estado IS NULL OR u.Status = @Estado);
        SELECT 
            u.idUsuario,
            u.UserName,
            u.SesionActive,
            u.Status,
            u.IntentosFallidos,
            us.FechaIngreso,
            us.FechaCierre,
            us.SesionExitosa,
            us.SesionFallida
        FROM 
            [PRUEBAUSUARIOS].[dbo].[Usuarios] u
        INNER JOIN 
            UltimaSesion us
        ON 
            u.idUsuario = us.idPersona
        WHERE 
            us.RowNum = 1 -- Solo la última sesión
            AND (@SesionActiva IS NULL OR u.SesionActive = @SesionActiva)
            AND (@SesionFallida IS NULL OR us.SesionFallida = @SesionFallida)
            AND (@Estado IS NULL OR u.Status = @Estado)
        ORDER BY 
            CASE WHEN @Order = 'asc' THEN 
                CASE WHEN @Sort = 'idUsuario' THEN u.idUsuario END
            END ASC,
            CASE WHEN @Order = 'desc' THEN 
                CASE WHEN @Sort = 'idUsuario' THEN u.idUsuario END
            END DESC
        OFFSET @Offset ROWS FETCH NEXT @NumRecordsPage ROWS ONLY;
    END

    -- Filtro 2: Consultar todas las sesiones
    ELSE IF @Filtro = 2
    BEGIN
	 SELECT 
            @TotalRecords = COUNT(*)
        FROM 
            [PRUEBAUSUARIOS].[dbo].[Usuarios] u
        LEFT JOIN 
            [PRUEBAUSUARIOS].[dbo].[Sessions] s
        ON 
            u.idUsuario = s.idPersona
        WHERE 
            (@SesionActiva IS NULL OR u.SesionActive = @SesionActiva)
            AND (@SesionFallida IS NULL OR s.SesionFallida = @SesionFallida)
            AND (@Estado IS NULL OR u.Status = @Estado);
        SELECT 
           

            u.idUsuario,
            u.UserName,
           
            u.Status,
            CASE 
                WHEN s.FechaIngreso IS NULL AND s.SesionExitosa IS NULL AND s.SesionFallida IS NULL THEN 'Sin sesión activa'
                ELSE CAST(ISNULL(s.FechaIngreso, '') AS NVARCHAR(50))
            END AS FechaIngreso,
            CASE 
                WHEN s.FechaIngreso IS NULL AND s.SesionExitosa IS NULL AND s.SesionFallida IS NULL THEN 'Sin sesión activa'
                ELSE CAST(ISNULL(s.SesionExitosa, '') AS NVARCHAR(50))
            END AS SesionExitosa,
            CASE 
                WHEN s.FechaIngreso IS NULL AND s.SesionExitosa IS NULL AND s.SesionFallida IS NULL THEN 'Sin sesión activa'
                ELSE CAST(ISNULL(s.SesionFallida, '') AS NVARCHAR(50))
            END AS SesionFallida
        FROM 
            [PRUEBAUSUARIOS].[dbo].[Usuarios] u
        LEFT JOIN 
            [PRUEBAUSUARIOS].[dbo].[Sessions] s
        ON 
            u.idUsuario = s.idPersona
        WHERE 
           
            (@SesionFallida IS NULL OR s.SesionFallida = @SesionFallida)
            AND (@Estado IS NULL OR u.Status = @Estado)
        ORDER BY 
            CASE WHEN @Order = 'asc' THEN 
                CASE WHEN @Sort = 'idUsuario' THEN u.idUsuario END
            END ASC,
            CASE WHEN @Order = 'desc' THEN 
                CASE WHEN @Sort = 'idUsuario' THEN u.idUsuario END
            END DESC
        OFFSET @Offset ROWS FETCH NEXT @NumRecordsPage ROWS ONLY;
    END

    -- Filtro 3: Consultar sin fechas
    ELSE IF @Filtro = 3
    BEGIN
	 SELECT 
            @TotalRecords = COUNT(*)
        FROM 
            [PRUEBAUSUARIOS].[dbo].[Usuarios] u
        WHERE 
            (@SesionActiva IS NULL OR u.SesionActive = @SesionActiva)
            AND (@Estado IS NULL OR u.Status = @Estado);
        SELECT 
            COUNT(*) OVER() AS TotalRecords,
            u.idUsuario,
            u.UserName,
            u.SesionActive,
            u.Status,
            u.IntentosFallidos
        FROM 
            [PRUEBAUSUARIOS].[dbo].[Usuarios] u
        WHERE 
            (@SesionActiva IS NULL OR u.SesionActive = @SesionActiva)
            AND (@Estado IS NULL OR u.Status = @Estado)
        ORDER BY 
            CASE WHEN @Order = 'asc' THEN 
                CASE WHEN @Sort = 'idUsuario' THEN u.idUsuario END
            END ASC,
            CASE WHEN @Order = 'desc' THEN 
                CASE WHEN @Sort = 'idUsuario' THEN u.idUsuario END
            END DESC
        OFFSET @Offset ROWS FETCH NEXT @NumRecordsPage ROWS ONLY;
    END
END;


/* CONTADOR DE USUARIOS (DASHBOARD) */

CREATE PROCEDURE ResumenDashboard
AS
BEGIN
    -- Variables para almacenar los resultados
    DECLARE @TotalRegistros INT;
    DECLARE @TotalBloqueados INT;
    DECLARE @TotalSesionActivaA INT;

    -- Calcular el total de registros
    SELECT @TotalRegistros = COUNT(*)
    FROM [PRUEBAUSUARIOS].[dbo].[Usuarios];

    -- Calcular el total de usuarios con Status = 'bloqueado'
    SELECT @TotalBloqueados = COUNT(*)
    FROM [PRUEBAUSUARIOS].[dbo].[Usuarios]
    WHERE Status = 'bloqueado';

    -- Calcular el total de usuarios con SesionActive = 'A'
    SELECT @TotalSesionActivaA = COUNT(*)
    FROM [PRUEBAUSUARIOS].[dbo].[Usuarios]
    WHERE SesionActive = 'A';

    -- Devolver los resultados como un conjunto de datos
    SELECT 
        @TotalRegistros AS TotalUsuarios,
        @TotalBloqueados AS TotalBloqueados,
        @TotalSesionActivaA AS TotalSesionActiva;
END;




/*CAMBIAR CONTRASEÑA*/

create PROCEDURE CambiarContrasena
    @Email NVARCHAR(255),             
    @Identificacion NVARCHAR(50),     
    @NuevaContrasena NVARCHAR(255),   
    @ConfirNuevaContrasena NVARCHAR(255), 
    @Mensaje NVARCHAR(255) OUTPUT ,
	 @Resultado NVARCHAR(255) OUTPUT 
AS
BEGIN
    SET NOCOUNT ON;
 
    
    -- Verificar si la nueva contraseña y la confirmación coinciden
    IF @NuevaContrasena != @ConfirNuevaContrasena
    BEGIN
        -- Devolver mensaje de error si las contraseñas no coinciden
        SET @Mensaje = 'La nueva contraseña y la confirmación no coinciden.';
        SET @Resultado = 0;  -- Error
        RETURN @Resultado;   -- Retornar 0 si hay un error
    END

    -- Verificar si el email y la identificación coinciden
    IF EXISTS (
        SELECT 1
        FROM Usuarios U
        INNER JOIN Personas P ON U.Persona_IdPersona2 = P.idPersona
        WHERE U.Mail = @Email AND P.Identificacion = @Identificacion
    )
    BEGIN
        -- Actualizar la contraseña
        UPDATE U
        SET U.Password = @NuevaContrasena
        FROM Usuarios U
        INNER JOIN Personas P ON U.Persona_IdPersona2 = P.idPersona
        WHERE U.Mail = @Email AND P.Identificacion = @Identificacion;

        -- Devolver mensaje de éxito
        SET @Mensaje = 'Contraseña actualizada correctamente.';
        SET @Resultado = 1;  -- Éxito
        RETURN @Resultado;   -- Retornar 1 si la operación fue exitosa
    END
    ELSE
    BEGIN
        -- Devolver mensaje de error si no se encuentra coincidencia
        SET @Mensaje = 'No se encontró ningún usuario con los datos proporcionados.';
        SET @Resultado = 0;  -- Error
        RETURN @Resultado;   -- Retornar 0 si hubo un error
    END
END;



/*ELIMINAR UN USUARIO (ADMINISTRADOR)*/

CREATE PROCEDURE EliminarUsuario
    @UsuarioId INT,  -- ID del usuario que se va a eliminar
    @IdAdmin INT,
	@Resultado INT OUTPUT-- 1 si es admin, 0 si no lo es
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el usuario tiene rol de admin
    IF @IdAdmin = 1
   BEGIN
        -- Actualizar el estado del usuario a 'Eliminado'
        UPDATE Usuarios
        SET Status = 'Eliminado'
        WHERE idUsuario = @UsuarioId;

        -- Retornar mensaje de éxito
        SET @Resultado=1
    END
    ELSE
    BEGIN
        -- Retornar -1 si no es admin
        SET @Resultado=-1
    END
END;



/*VERIFICAR LAS OPCIONES DE LOS ROLES (ADMINISTRADOR- CRUDS) */


CREATE PROCEDURE ROLESOPCIONES
	  @IdUsuario INT
AS
BEGIN
    SET NOCOUNT ON;
	SELECT Opcion_IdOpcion, Activo  FROM AsignaRoles WHERE IdUsuario=@IdUsuario
	END;

 /*ACTUALIZAR LOS DATOS DE USUARIO GENERAL*/

create PROCEDURE ActualizarDatosUsuarioGeneral 
    @IdUsuario INT,
    @NuevoUserName NVARCHAR(50),
    @Nombres NVARCHAR(50),
    @Apellidos NVARCHAR(50),
    @FechaNacimiento DATE
   
AS
BEGIN
    SET NOCOUNT ON;
	IF EXISTS (
        SELECT 1
        FROM RolUsuarios r
        WHERE r.Usuarios_idUsuarios = @IdUsuario AND r.Rol_idRol = 2
    )
    BEGIN
    UPDATE u
    SET 
        u.UserName = @NuevoUserName
    FROM Usuarios u
    WHERE u.idUsuario = @IdUsuario;

    UPDATE p
    SET 
        p.Nombres = @Nombres,
        p.Apellidos = @Apellidos,
        p.FechaNacimiento = @FechaNacimiento
		
    FROM Personas p
    INNER JOIN Usuarios u ON p.idPersona = u.Persona_IdPersona2
    WHERE u.idUsuario = @IdUsuario;
	 SELECT 1 AS Resultado; -- Éxito
	 END
    ELSE
    BEGIN
	  SELECT 0 AS Resultado;
        -- Si no es administrador, generar un mensaje de error
        THROW 50000, 'El usuario no tiene permisos para actualizar estos datos.', 1;
    END
END;



/*ACTUALIZAR DATOS SOLO PARA EL ADMINISTRADOR EN SI(NO OTROS)  */



CREATE PROCEDURE ActualizarDatosAdmin 
    @IdUsuario INT,
    @NuevoUserName NVARCHAR(50),
    @Nombres NVARCHAR(50),
    @Apellidos NVARCHAR(50),
    @FechaNacimiento DATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el usuario es administrador
    IF EXISTS (
        SELECT 1
        FROM RolUsuarios r
        WHERE r.Usuarios_idUsuarios = @IdUsuario AND r.Rol_idRol = 1
    )
    BEGIN
        -- Actualizar datos en la tabla Usuarios
        UPDATE u
        SET 
            u.UserName = @NuevoUserName
        FROM Usuarios u
        WHERE u.idUsuario = @IdUsuario;

        -- Actualizar datos en la tabla Personas
        UPDATE p
        SET 
            p.Nombres = @Nombres,
            p.Apellidos = @Apellidos,
            p.FechaNacimiento = @FechaNacimiento
            
        FROM Personas p
        INNER JOIN Usuarios u ON p.idPersona = u.Persona_IdPersona2
        WHERE u.idUsuario = @IdUsuario;
		  SELECT 1 AS Resultado; -- Éxito
    END
    ELSE
    BEGIN
	  SELECT 0 AS Resultado;
        -- Si no es administrador, generar un mensaje de error
        THROW 50000, 'El usuario no tiene permisos para actualizar estos datos.', 1;
    END
END;





/*CONSULTAR LOS DATOS DEL PERFIL ADMINISTRADOR (SOLO PARA EL USUARIO ADMIN EN SI)*/
create PROCEDURE ConsultarDatosAdmin 
    @IdUsuario INT
   
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el usuario es administrador
    IF EXISTS (
        SELECT 1
        FROM RolUsuarios r
        WHERE r.Usuarios_idUsuarios = @IdUsuario AND r.Rol_idRol = 1
    )
    BEGIN
       
       Select top 1
            p.Nombres ,
            p.Apellidos ,
            p.FechaNacimiento ,
          p.Identificacion,
		  u.UserName,
		  u.Mail,
		    (SELECT MAX(s.FechaIngreso) FROM Sessions s WHERE s.idPersona = u.IdUsuario)as FechaIngreso
          
        FROM Personas p
        INNER JOIN Usuarios u ON p.idPersona = u.Persona_IdPersona2
		 LEFT JOIN Sessions s ON u.IdUsuario = s.idPersona
        WHERE u.idUsuario = @IdUsuario;
		  SELECT 1 AS Resultado; -- Éxito
    END
    ELSE
    BEGIN
	  SELECT 0 AS Resultado;
        -- Si no es administrador, generar un mensaje de error
        THROW 50000, 'El usuario no tiene permisos para actualizar estos datos.', 1;
    END
END;



/*CONSULTA DE DATOS DE PERFIL PARA EL USUARIO GENERAL */
create PROCEDURE ConsultarDatosUsuarioGeneral 
    @IdUsuario INT
   
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el usuario es administrador
    IF EXISTS (
        SELECT 1
        FROM RolUsuarios r
        WHERE r.Usuarios_idUsuarios = @IdUsuario AND r.Rol_idRol = 2
    )
    BEGIN
       
       Select top 1
            p.Nombres ,
            p.Apellidos ,
            p.FechaNacimiento ,
          p.Identificacion,
		  u.UserName,
		  u.Mail,
		    (SELECT MAX(s.FechaIngreso) FROM Sessions s WHERE s.idPersona = u.IdUsuario)as FechaIngreso
          
        FROM Personas p
        INNER JOIN Usuarios u ON p.idPersona = u.Persona_IdPersona2
		 LEFT JOIN Sessions s ON u.IdUsuario = s.idPersona
        WHERE u.idUsuario = @IdUsuario;
		  SELECT 1 AS Resultado; -- Éxito
    END
    ELSE
    BEGIN
	  SELECT 0 AS Resultado;
        -- Si no es administrador, generar un mensaje de error
        THROW 50000, 'El usuario no tiene permisos para actualizar estos datos.', 1;
    END
END;







/* TRIGGERS */

/*TRIGGER QUE VERIFICA LOS INTENTOS FALLIDOS AL INTENTAR INICIAR SESION, ESTE CAMBIA
SU ESTADO A BLOQUEADO PARA ASI NO PERMITIR SU INGRESO
*/


	CREATE TRIGGER BloqueoUsuario
ON Usuarios
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Verifica si hay actualizaciones en la columna IntentosFallidos
    IF EXISTS (
        SELECT 1
        FROM inserted i
        INNER JOIN deleted d
            ON i.IdUsuario = d.IdUsuario
        WHERE i.IntentosFallidos >= 3 AND i.IntentosFallidos <> d.IntentosFallidos
          AND i.Status <> 'Bloqueado'
    )
    BEGIN
        -- Actualiza el estado del usuario a 'Bloqueado'
        UPDATE Usuarios
        SET Status = 'Bloqueado'
        FROM Usuarios u
        INNER JOIN inserted i
            ON u.IdUsuario = i.IdUsuario
        WHERE i.IntentosFallidos >= 3;

        PRINT 'Usuario bloqueado debido a múltiples intentos fallidos de inicio de sesión.';
    END
END;


/* TRIGER QUE VALIDA QUE LA CONTRASEÑA CUMPLA CON LOS CARACTERES CORRESPONDIENTES */

create TRIGGER trgValidarContrasena
ON Usuarios
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar las contraseñas de las filas insertadas o actualizadas
    IF EXISTS (
        SELECT 1
        FROM inserted
        WHERE 
            LEN(Password) < 8 OR                        -- Mínimo 8 caracteres
            Password COLLATE Latin1_General_BIN NOT LIKE '%[A-Z]%' OR  -- Al menos una letra mayúscula
            Password LIKE '% %' OR                      -- No debe contener espacios
            Password NOT LIKE '%[!@#$%^&*()_+=-]%'      -- Al menos un signo
    )
    BEGIN
        -- Cancelar la operación si alguna contraseña no cumple con las métricas
        RAISERROR ('La contraseña no cumple con los requisitos: mínimo 8 caracteres, al menos una letra mayúscula, sin espacios y debe contener al menos un signo.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;





	