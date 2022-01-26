import styles from '../styles/Home.module.css';

function notavailable() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>No Access</h2>
        <p>
          Sorry! The account you signed in with does not have access to this
          site.
        </p>
        <br></br>
        <p>
          <small>If you chose the wrong account please try again.</small>
        </p>
      </div>
    </main>
  );
}

export default notavailable;
