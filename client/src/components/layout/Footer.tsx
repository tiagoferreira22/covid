import styles from'./Footer.module.css'

export default function Footer(){
    const dataAtual = new Date().getFullYear()
    return(
        <footer className={styles.footer}>
            <p> &copy;{dataAtual} | <a href="https://github.com/tiagoferreira22" target='_blank'><span>Tiago Ferreira</span></a></p>
        </footer>
    )
}
