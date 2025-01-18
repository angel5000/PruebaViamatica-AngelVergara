
select*from Usuarios
select*from Personas
update Usuarios set SesionActive='I' where idUsuario=3
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
	 @FechaNacimiento Date,
    @Mail NVARCHAR(120),
    @UserName NVARCHAR(50),
    @Password NVARCHAR(50),
    @Status CHAR(20),
    @SesionActive CHAR(1),
    @PersonaId INT OUTPUT,
    @UsuarioId INT OUTPUT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
	
        INSERT INTO Personas ( Nombres, Apellidos, Identificacion,FechaNacimiento, [Status])
        VALUES (@Nombres, @Apellidos, @Identificacion, @FechaNacimiento,'Activo');
        
        SET @PersonaId = SCOPE_IDENTITY();
     INSERT INTO Usuarios (UserName,[Password],	Mail	,SesionActive,	Persona_IdPersona2,	[Status] )
    VALUES (@UserName, @Password, @Mail, @SesionActive,@PersonaId, 'Activo');

        SET @UsuarioId = SCOPE_IDENTITY();

		
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





        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;  -- Vuelve a lanzar el error si ocurre alguna excepción
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
    @Login NVARCHAR(50), -- Puede ser UserName o Mail
    @Password NVARCHAR(50),
    @Result INT OUTPUT,
    @Rol INT OUTPUT, -- Variable de salida para el rol del usuario
    @UsuarioId INT OUTPUT, -- Variable de salida para el ID del usuario
    @UserName NVARCHAR(50) OUTPUT, -- Variable de salida para el UserName
    @Mail NVARCHAR(50) OUTPUT, -- Variable de salida para el Mail
    @Nombres NVARCHAR(100) OUTPUT, -- Variable de salida para el Nombres
    @Apellidos NVARCHAR(100) OUTPUT, -- Variable de salida para el Apellidos
    @Identificacion NVARCHAR(50) OUTPUT, -- Variable de salida para el Identificacion
    @FechaNacimiento DATE OUTPUT -- Variable de salida para el FechaNacimiento
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
        @FechaNacimiento = p.FechaNacimiento
    FROM Usuarios u
    INNER JOIN Personas p ON u.Persona_IdPersona2 = p.idPersona
    WHERE u.UserName = @Login OR u.Mail = @Login;

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


EXEC InicioSesion 
    @Login = 'angelvergarap', 
    @Password = 'P@ssw0rd123', 
    @Rol = @Rol OUTPUT, 
    @Result = @Resultado OUTPUT, 
    @UsuarioId = @id OUTPUT,
    @UserName = @UserName OUTPUT,
    @Mail = @Mail OUTPUT,
    @Nombres = @Nombres OUTPUT,
    @Apellidos = @Apellidos OUTPUT,
    @Identificacion = @Identificacion OUTPUT,
    @FechaNacimiento = @FechaNacimiento OUTPUT;

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
    @FechaNacimiento AS FechaNacimiento;


select*from Usuarios

EXEC CerrarSesion 
    @Login = 'angelvergarap'
  


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
    @Login = 'angelvergarap'
  

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


CREATE PROCEDURE ConsultarUsuariosYPersonas
    @UsuarioId INT  -- Se pasa el ID del usuario para verificar su rol
AS
BEGIN
    SET NOCOUNT ON;

    -- Declarar variable para verificar si el usuario es admin
    DECLARE @EsAdmin BIT;

    -- Consultar el rol del usuario (si es admin)
    SELECT @EsAdmin = CASE WHEN Rol_idRol = 1 THEN 1 ELSE 0 END
    FROM RolUsuarios
    WHERE Usuarios_idUsuarios = @UsuarioId;

    -- Consulta combinada de Usuarios y Personas
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
        (@EsAdmin = 0 OR u.idUsuario != @UsuarioId)  -- Si es admin, no mostrar su propio usuario
        AND NOT EXISTS (
            SELECT 1
            FROM RolUsuarios ru
            WHERE ru.Usuarios_idUsuarios = u.idUsuario
            AND ru.Rol_idRol = 1
        );  -- Si es admin, no mostrar usuarios con rol=1
END;


EXEC ConsultarUsuariosYPersonas
  @UsuarioId = 1