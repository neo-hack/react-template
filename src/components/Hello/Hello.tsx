import React from 'react'
import styles from './hello.module.styl'

const Hello = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className={styles.hello}>
      <p>Hello,</p>
      {children}
    </div>
  )
}

export default Hello
