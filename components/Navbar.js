import React from 'react'
import Link from 'next/link'
import styles from "@/styles/Home.module.css";
const Navbar = () => {
  return (
    <nav className={styles.navbar} >
    <ul>
      <li><Link href='/'  style={{ textDecoration: 'none',color:'white'}}>Home</Link></li>
      <li><Link href='/about' style={{ textDecoration: 'none',color:'white'}}>About</Link></li>
      <li><Link href='/blogs' style={{ textDecoration: 'none',color:'white'}}>blogs</Link></li>
      <li><Link href='/contact' style={{ textDecoration: 'none',color:'white'}}>Contact</Link></li>
    </ul>
  </nav>
  )
}

export default Navbar
