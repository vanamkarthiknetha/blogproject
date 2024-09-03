import React,{useState} from "react";
import { useRouter } from 'next/navigation'
import styles from "@/styles/Contact.module.css";
const contact = () => {
  const [name, setname] = useState("")
  const [phone, setphone] = useState("")
  const [email, setemail] = useState("")
  const [desc, setdesc] = useState("")
  const router = useRouter()
  const onChange=(e)=>{
    if(e.target.name=='name')
        setname(e.target.value)
    else if(e.target.name=='phone')
        setphone(e.target.value)
    else if(e.target.name=='email')
        setemail(e.target.value)
    else if(e.target.name=='desc')
        setdesc(e.target.value)
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const res=await fetch('http://localhost:3000/api/contact/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,phone,email,desc})
    });
    // console.log(await res.json());
    router.replace('/')
    setname(''),setphone(''),setemail(''),setdesc('');
    
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input 
            onChange={onChange}
            value={name}
            type="text"
            className={styles.input}
            id="name"
            name="name"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <input value={phone} onChange={onChange} type="phone" className={styles.input} name="phone" id="phone" required/>
        </div>
        <div className={styles.mb3}>
          <label className={styles.label} htmlFor="email">
            email
          </label>
          <input 
            onChange={onChange}
            value={email}
            type="email"
            name="email"
            className={styles.input}
            id="email"
            required
          />
        </div>
        <div className={styles.mb3}>
        <label className={styles.label} htmlFor="desc">
            describe
          </label>
          <textarea
            value={desc}
            onChange={onChange}
            className={styles.input}
            id="desc"
            name="desc"
          ></textarea>
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default contact;
