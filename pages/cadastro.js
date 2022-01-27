import Head from 'next/head'
import styles from '../styles/Cadastro.module.css'
import { BsFillInfoSquareFill } from 'react-icons/bs'
import { useState } from 'react';
import React from 'react'
import Popup from 'reactjs-popup'
import Link from 'next/link';
export default function Cadastro() {
  const handleSubmit = function (event) {
    event.preventDefault()
  }
  const handleClickSubmit = function () {
    const button = document.querySelector('#submiter')
    button.style.transform = `translateY(2px)`
    setTimeout(() => {
      button.style.transform = ``
    }, 200);
  }
  const [showPassword, setToggle] = useState(false);
  return (
    <div className={styles.sing_container}>
      <Head>
        <title>Entre a bordo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <meta charSet="UTF-8" />
        {/* <meta name="theme-color" content="#23232e"/> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@300&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <form onSubmit={handleSubmit} className={styles.formulary}>
        <h1>Obtenha acesso à plataforma</h1>
        <div className={styles.bomb_logo}>
          <img src='https://bombcrypto.io/wp-content/uploads/2021/08/12.png' alt='bombimage' />
        </div>
        <div className={styles.group_one}>
          <div className={styles.username}>
            <input type={'text'} placeholder='Nome' required id='first_name' />
            <input type={'text'} placeholder='Sobrenome' id='last_name' required />
          </div>
          <div className={styles.userpassword}>
            <div className={styles.password}>
              <div className={styles.pass_field}>
                <input type={showPassword ? 'text' : 'password'} required placeholder='Senha' id='password_field' /></div>
              <div className={styles.showPass}>
                <input type='checkbox' id='showpass' onClick={() => {
                  setToggle(!showPassword)
                }} />
                <label htmlFor='showpass'>Mostrar senha</label>
              </div>

            </div>
            <div className={styles.team} >
              <input type='text' placeholder='Crie seu time' />

              <Popup trigger={<BsFillInfoSquareFill />} modal nested>
                {
                  close => (
                    <div className={styles.popup_container}>
                      <button className={styles.close} onClick={close}>
                        &times;
                      </button>
                      <p>Ao criar um time você pode configurá-lo de forma única, personalizando o número de contas e de pessoas que o compõe.</p>
                      <p>É possível adicionar outras pessoas ao seu time, dando assim, acesso aos dados do seu time, consequentemente das contas que o compõe.</p>
                      <p>Usuário de fora não poderão acessar, vizualizar ou modificar os dados de times que não possuem ou fazem parte</p>
                    </div>
                  )
                }
              </Popup>
            </div>
          </div>
          <div className={styles.submit_container}>
            <Link href='/'>Já possui uma conta?</Link>
            <input type='submit' value='Cadastrar' id='submiter' onClick={handleClickSubmit} />
          </div>
        </div>

      </form>

    </div>
  )
}