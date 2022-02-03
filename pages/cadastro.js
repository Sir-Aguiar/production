import Head from 'next/head'
import styles from '../styles/Cadastro.module.css'
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import React from 'react'
import Link from 'next/link';
import ServicesApi from '../scripts/ServicesAPI';
export default function Cadastro() {
  useEffect(() => {
    document.getElementById('first_name').value = ''
    document.getElementById('last_name').value = ''
    document.getElementById('username').value = ''
    document.getElementById('password_field').value = ''

  }, [])
  const userData = {
    service: 'CADASTRO',
    userName: '',
    fullName: '',
    userPassword: ''
  }
  function getUserdata() {
    const fname = document.getElementById('first_name')
    const lname = document.getElementById('last_name')
    const username = document.getElementById('username')
    const password = document.getElementById('password_field')

    userData.fullName = `${String(fname.value).trim()} ${String(lname.value).trim()}`
    userData.userName = `${String(username.value).trim()}`
    userData.userPassword = `${String(password.value).trim()}`
    if (userData.fullName.includes(',') || userData.userName.includes(',') || userData.userPassword.includes(',')) {
      alert('Não é permitido inserir "," nos campos de cadastro')
      location.reload()
    }
  }

  const handleSubmit = function (event) {
    event.preventDefault()
    getUserdata()

    ServicesApi.post('', userData).then((response) => {
      if (response.data.serviceStatus == 0) {
        alert('Cadastro realizado com sucesso')
      }
      else if (response.data.serviceStatus == -1) {
        alert('Nome de usuário já em uso')
      }
      else {
        alert('Houve um erro inesperado')
      }
    })
    console.log(userData)
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
        <meta name="theme-color" content="#228cbdb4" />
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
          <div className={styles.name}>
            <input type={'text'} placeholder='Nome' required id='first_name' />
            <input type={'text'} placeholder='Sobrenome' id='last_name' required />

          </div>
          <div className={styles.username}>
            <input type='text' placeholder='Nome de usuário' id='username' required />
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