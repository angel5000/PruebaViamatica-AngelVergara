
select*from Usuarios
select*from Personas

CREATE PROCEDURE sp_RegistrarPersonaYUsuario
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


SELECT @PersonaId AS PersonaId, @UsuarioId AS UsuarioId;

CREATE PROCEDURE InicioSesion
    @Login NVARCHAR(50), 
    @Password NVARCHAR(50),
    @Result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM Usuarios
        WHERE (UserName = @Login OR Mail = @Login)
          AND Password = @Password
    )
    BEGIN
        SET @Result = 1; -- Usuario válido
    END
    ELSE
    BEGIN
        SET @Result = 0; -- Usuario inválido
    END
END



