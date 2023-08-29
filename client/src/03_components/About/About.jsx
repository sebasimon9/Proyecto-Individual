import React from 'react'
import styles from './About.module.css';
import NavBar from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';

export default function About() {
    return (
        <>
            <NavBar />
            <section className={styles.section}>
                <h1>Acerca de mi y el proyecto</h1>
            </section>
            <section className={styles.section}>
                <div className={styles.aboutMe}>
                    <h2 className={styles.title}>Sobre mi</h2>
                    <p className={styles.text}>
                        Hola! soy Sebastian, un desarrollador Full-Stack con una
                        actitud positiva y orientada al trabajo en equipo, con
                        habilidades técnicas sólidas y una pasión por la
                        resolución de conflictos.
                    </p>
                </div>
            </section>
            <section className={styles.section}>
                <div className={styles.aboutMe}>
                    <h2 className={styles.title}>Sobre la App</h2>
                    <p className={styles.text}>
                        En el bootcamp de Soy Henry, hice el proyecto
                        individual que consistía en crear una aplicación
                        fullstack usando la API de paises de manera local. La
                        aplicación está hecha con el stack React, Redux,
                        Express.js, postgreSQL y Sequelize. En las
                        funcionalidades esta crear actividades de todo tipo, filtrar
                        por poblacion, continente, orden alfabetico.
                    </p>
                </div>
            </section>
            <div className={styles.footer}>
            <Footer/>
            </div>
        </>
    );
};

