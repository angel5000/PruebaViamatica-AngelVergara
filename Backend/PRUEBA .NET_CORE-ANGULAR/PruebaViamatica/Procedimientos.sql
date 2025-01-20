
select*from Usuarios
select*from Personas
delete Usuarios where idUsuario=7
delete Personas where idPersona=7
delete Sessions where idPersona=7
select*from Sessions
update Usuarios set SesionActive='I' where idUsuario=7
select*from Roles
select*from RolUsuarios
select*from RolOpciones
select*from RolRolOpciones
insert into Roles (RolName)
values('Administrador'),('Usuario')

insert into RolUsuarios (Rol_idRol,Usuarios_idUsuarios)
values(1,5)

insert into RolOpciones(NombreOpciones)
values('Crear_Admin'),('Editar_Admin'),('Modificar_Admin'),
('Eliminar_Admin'),('VerReportes_Admin'),('Modificar_General')
,('VerReporte_General'),('Eliminar_General'),('Crear_General')

insert into RolRolOpciones(Rol_idRol,RolOpciones_idOpciones)
values(1,1),(1,2),(1,3),(1,4),(1,5),(2,7),(2,6)




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


DECLARE @PersonaId INT, @UsuarioId INT;

EXEC sp_RegistrarPersonaYUsuario
    @Identificacion = '0946584567', 
    @Nombres = 'Angel David', 
    @Apellidos = 'Vergara Paredes',
    @FechaNacimiento = '2000-01-30', 
    @Mail = 'angel.david@email.com', 
    @UserName = 'angelvergarap', 
    @Password = 'password123', 
    @Status = 'Activo', 
    @SesionActive = 'S',
    @PersonaId = @PersonaId OUTPUT,
    @UsuarioId = @UsuarioId OUTPUT;

	update Usuarios set Password='P@ssw0rd123' where idUsuario=1
SELECT @PersonaId AS PersonaId, @UsuarioId AS UsuarioId;

create PROCEDURE InicioSesion 
    @Login NVARCHAR(50), 
    @Password NVARCHAR(50),
    @Result INT OUTPUT,
    @Rol INT OUTPUT, -- 
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

    DECLARE @IntentosFallidos INT;
    DECLARE @Status CHAR(20);
    DECLARE @RolId INT;
	
    -- Verificar si el usuario existe y obtener el estado y el ID de usuario
    SELECT 
        @Status = u.Status,
        @UsuarioId = u.IdUsuario,
        @UserName = u.UserName,
        @Mail = u.Mail,
        @Nombres = p.Nombres,
        @Apellidos = p.Apellidos,
        @Identificacion = p.Identificacion,
        @FechaNacimiento = p.FechaNacimiento,
		@FechaIngreso=s.FechaIngreso,
		@FechaCierre=s.FechaCierre
    FROM Usuarios u
    INNER JOIN Personas p ON u.Persona_IdPersona2 = p.idPersona
	Left JOIN Sessions s on u.idUsuario=s.idPersona
    WHERE u.UserName = @Login OR u.Mail = @Login order by FechaIngreso asc;

    IF @Status = 'Bloqueado'
    BEGIN
        SET @Result = -1; -- Usuario bloqueado
        RETURN;
    END

    -- Verificar si el usuario existe y la contraseña coincide
    IF EXISTS (
        SELECT 'A'
        FROM Usuarios
        WHERE (UserName = @Login OR Mail = @Login)
          AND Password = @Password
    )
    BEGIN
        -- Verificar si ya tiene una sesión activa
        IF EXISTS (
            SELECT 'A'
            FROM Usuarios
            WHERE (UserName = @Login OR Mail = @Login)
              AND SesionActive = 'A'
        )
        BEGIN
            SET @Result = 2; -- Sesión ya activa
            -- Obtener el rol del usuario
            SELECT TOP 1 
                @RolId = Rol_idRol
            FROM RolUsuarios
            WHERE Usuarios_idUsuarios = @UsuarioId;

            -- Asignar el nombre del rol basado en el ID del rol
            SET @Rol = @RolId;

            RETURN;
        END

        -- Actualizar SesionActiva a 'A' para el usuario
        UPDATE Usuarios
        SET SesionActive = 'A'
        WHERE UserName = @Login OR Mail = @Login;

        -- Insertar en la tabla Sessions
        INSERT INTO Sessions (FechaIngreso, idPersona)
        VALUES (GETDATE(), @UsuarioId);

        -- Obtener el rol del usuario
        SELECT TOP 1 
            @RolId = Rol_idRol
        FROM RolUsuarios
        WHERE Usuarios_idUsuarios = @UsuarioId;

        -- Asignar el nombre del rol basado en el ID del rol
        SET @Rol = @RolId;

        SET @Result = 1; -- Inicio de sesión exitoso
    END
    ELSE
    BEGIN
        -- Incrementar intentos fallidos
        UPDATE Usuarios
        SET IntentosFallidos = IntentosFallidos + 1
        WHERE UserName = @Login OR Mail = @Login;

        SELECT @IntentosFallidos = IntentosFallidos
        FROM Usuarios
        WHERE UserName = @Login OR Mail = @Login;

        PRINT 'Intentos fallidos: ' + CAST(@IntentosFallidos AS NVARCHAR) + '/3';

        SET @Result = 0; -- Usuario o contraseña incorrectos
    END
END


select*from Sessions


DECLARE @Resultado INT;
DECLARE @Rol INT;
DECLARE @id INT;
DECLARE @UserName NVARCHAR(50);
DECLARE @Mail NVARCHAR(50);
DECLARE @Nombres NVARCHAR(100);
DECLARE @Apellidos NVARCHAR(100);
DECLARE @Identificacion NVARCHAR(50);
DECLARE @FechaNacimiento DATE;
DECLARE @FechaIngreso DATETIME;
DECLARE @FechaCierre DATETIME;

EXEC InicioSesion 
    @Login = 'Narcisax23', 
    @Password = 'Helado500@', 
    @Rol = @Rol OUTPUT, 
    @Result = @Resultado OUTPUT, 
    @UsuarioId = @id OUTPUT,
    @UserName = @UserName OUTPUT,
    @Mail = @Mail OUTPUT,
    @Nombres = @Nombres OUTPUT,
    @Apellidos = @Apellidos OUTPUT,
    @Identificacion = @Identificacion OUTPUT,
    @FechaNacimiento = @FechaNacimiento OUTPUT,
	@FechaCierre=@FechaCierre OUTPUT,
	  @FechaIngreso = @FechaIngreso OUTPUT;

-- Mostrar los resultados
SELECT 
    @Resultado AS Resultado,
    @Rol AS Rol,
    @id AS UsuarioId,
    @UserName AS UserName,
    @Mail AS Mail,
    @Nombres AS Nombres,
    @Apellidos AS Apellidos,
    @Identificacion AS Identificacion,
    @FechaNacimiento AS FechaNacimiento,
	@FechaIngreso AS FechaIngreso,
	@FechaCierre as FechaCierre;

select*from Usuarios
select*from Sessions
EXEC CerrarSesion 
    @Login = 'Narcisax23'
  


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

EXEC CerrarSesion 
    @Login = 'canelax23'
  

-- Mostrar el resultado
SELECT @Resultado AS Resultado;


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

        -- Mensaje informativo (opcional)
        PRINT 'Usuario bloqueado debido a múltiples intentos fallidos de inicio de sesión.';
    END
END;

create PROCEDURE ConsultarUsuariosYPersonasConFiltros
    @UsuarioId INT,
    @NumPage INT = 1,
    @NumRecordsPage INT = 10,
    @Order NVARCHAR(10) = 'asc',
    @Sort NVARCHAR(50) = 'idUsuario',
    @NumFilter INT = NULL,
    @TextFilter NVARCHAR(100) = NULL,
    @StateFilter INT = NULL,
    @StartDate NVARCHAR(10) = NULL,
    @EndDate NVARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EsAdmin INT;

    -- Verificar si el usuario es admin
    SELECT @EsAdmin = CASE WHEN Rol_idRol = 1 THEN 1 ELSE 0 END
    FROM RolUsuarios
    WHERE Usuarios_idUsuarios = @UsuarioId;

    -- Consulta con filtros y paginación
    SELECT 
        u.idUsuario,
        u.UserName,
        u.Password,
        u.Mail,
        u.SesionActive,
        u.Status AS StatusUsuario,
        u.IntentosFallidos,
        p.Nombres,
        p.Apellidos,
        p.Identificacion,
        p.FechaNacimiento,
        p.Status AS StatusPersona
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
        -- Lógica de filtros basada en @NumFilter
        AND (
            @NumFilter IS NULL 
            OR (@NumFilter = 1 AND p.Nombres LIKE '%' + @TextFilter + '%')  -- Filtrar por Nombres
            OR (@NumFilter = 2 AND u.UserName LIKE '%' + @TextFilter + '%') -- Filtrar por UserName
        )
        AND (@StateFilter IS NULL OR u.Status = @StateFilter)
        AND (@StartDate IS NULL OR p.FechaNacimiento >= @StartDate)
        AND (@EndDate IS NULL OR p.FechaNacimiento <= @EndDate)
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

create PROCEDURE ConsultarUsuariosYPersonasConFiltros
    @UsuarioId INT,
    @NumPage INT = 1,
    @NumRecordsPage INT = 10,
    @Order NVARCHAR(10) = 'asc',
    @Sort NVARCHAR(50) = 'idUsuario',
    @NumFilter INT = NULL,
    @TextFilter NVARCHAR(100) = NULL,
    @StateFilter INT = NULL,
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
    SELECT @totalRecords = COUNT(*)
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
        u.Password,
        u.Mail,
        u.SesionActive,
        u.Status AS StatusUsuario,
        u.IntentosFallidos,
        p.Nombres,
        p.Apellidos,
        p.Identificacion,
        p.FechaNacimiento,
        p.Status AS StatusPersona,
        @totalRecords AS TotalRecords
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

DECLARE @Total INT;
EXEC ConsultarUsuariosYPersonasConFiltros
  @UsuarioId = 1,
    @TotalRecords = @Total OUTPUT

	SELECT @Total AS TotalRecords;

  @NumFilter=1,
  @TextFilter='Juan',
  @Sort='Nombres',
  @NumRecordsPage=2




create PROCEDURE ActualizarUsuarioYPersona
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
              AND U.idUsuario= @IdUsuario
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
        WHERE U.[idUsuario] = @IdPersona;

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



select*from Usuarios
select*from Personas

update Usuarios set Mail='carfrankl29' where idUsuario=7
EXEC ActualizarUsuarioYPersona
    @IdUsuario = 1,
    @UserName = 'angelvergarap',
    @SesionActive = 'A',
    @StatusUsuario = 'Activo',
    @IdPersona = 1,
    @Nombres = 'Angel David',
    @Apellidos = 'Vergara Paredes',
    @FechaNacimiento = '2000-01-30',
    @StatusPersona = 'Activo';


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

EXEC ConsultarUsuarioPorId @idUsuario = 1;
