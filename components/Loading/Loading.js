import styles from './Loading.module.css'
export default function Loading({ loadingSize, containerSize, loading }) {
  const containerStyle = {
    width: `${containerSize}vw`,
    height: `${containerSize}vh`,
  }
  const loadingStyle = {
    width: `${containerSize}px`,
    height: `${containerSize}px`,
  }
  return (
    <div className={styles.spin_container} style={containerStyle}>
      <div className={`${styles.spinner} ${loading ? styles.active : ''}`} style={loadingStyle}>

      </div>
    </div>
  )
}