"use client"

import Image from "next/image";
import "./login.css"
import { FormEvent, useState } from "react";
import appwriteService from "../../../appwrite-service/appwrite";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUp:React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    appwriteService
      .createAccount({
        email: formData.email,
        password:formData.password,
        username: formData.username,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
        setError('Error occurred while creating the account. Please try again.');
      });
  };  


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  
  return (
    <>
      <div className="container">
        <div className="left-side">
          <div className="form">
            <h1>Join TapBio</h1>
            <h4>Welcome Back!!</h4>
             {error && <p style={{ color: 'red' }}>{error}</p>} 
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />

            <label>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <input type="submit" value="Create Account" />
            </form>
          </div>
        </div>
        <div className="right-side">
          <Image src=""  alt="Signup Image" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
