import styles from "./Section.module.css";

function Section({ children, title }) {
    return (
        <section className={styles["section-center"]}>
            <h3 className={styles["section-title"]}>{title}</h3>
            {children}
        </section>
    );
}

export default Section;
