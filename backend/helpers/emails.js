import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {

    const {email, nombre, token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    //Info del mail

    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyects" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirma tu cuenta",
        text: "Confirma tu cuenta en UpTask",
        html: `<p>Hola: ${nombre}! Confirma tu cuenta en UpTask</p>
        <p>Tu cuenta ya está casi lista. Solo debes confirmarla en el siguiente enlace:
        
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprobar cuenta </a>
        </p>

        <p> Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })
}

export const emailOlvidePassword = async (datos) => {

  const {email, nombre, token} = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  //Info del mail

  const info = await transport.sendMail({
      from: '"UpTask - Administrador de Proyects" <cuentas@uptask.com>',
      to: email,
      subject: "UpTask - Reestablece tu password",
      text: "Reestablece tu password en UpTask",
      html: `<p>Hola: ${nombre}! Has solicitado reestablecer tu password en UpTask</p>
      <p>Sigue el siguiente enlace para generar un nuevo password:
      
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> Reestablecer password </a>
      </p>

      <p> Si tu no solicitaste este email, puedes ignorar este mensaje</p>
      `
  })
}
