import styles from "./Skeleton.module.css";

function Skeleton() {
    return (
        <div className={styles.skeleton}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Skeleton;