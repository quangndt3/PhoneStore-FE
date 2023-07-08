import axios from "axios";
import { object } from "joi";
import { Callback } from "mongoose";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IUser } from "../../models";
import { signup } from "../../api/users";


const Signin = () => {
  const [valueInput, setValueInput] = useState({});
  const onHandleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + value);

    setValueInput({ ...valueInput, [name]: value });
  };
  console.log(valueInput);

  const navigate = useNavigate();
  const upload = async (files: any) => {
    const CLOUD_NAME = "djf42qmp6";
    const PRESET_NAME = "spring2023";
    const FOLDER_NAME = "react";
    const linkanh: string[] = [];

    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for (const file of files) {
      formData.append("file", file);
      const response = await axios
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/from-data",
          },
        })
        .then((res) => {
          linkanh.push(res.data.secure_url);
        });
    }

    return linkanh;
  };

  const onHandleSubmit = async (e: any) => {
    e.preventDefault();

    const testanh = document.querySelector(".img") as HTMLInputElement;

    const anh = await upload(testanh!.files);
    const acc = { ...valueInput, images: anh[0] }
    signup(acc)
      .then(({data}: any) => {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("acc", JSON.stringify(data.data));
        alert("Thành công");
        navigate("/");
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Đăng ký</h1>

       
      </div>

      <form
        action=""
        onSubmit={onHandleSubmit}
        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
      >
        <div>
          <div className="relative">
            <input
              type="text"
              name="name"
              onChange={onHandleChange}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm mb-[20px]"
              placeholder="name"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              onChange={onHandleChange}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
            />

            <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
        <input
          type="file"
          name="images"
          className="img w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        />
        <div>
          <label className="sr-only">Password</label>

          <div className="relative">
            <input
              type="password"
              name="password"
              onChange={onHandleChange}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
            />

            <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <label className="sr-only">Repassword</label>

          <div className="relative">
            <input
              type="password"
              name="rePassword"
              onChange={onHandleChange}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter repassword"
            />

            <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <a className="underline" href="">
              Sign up
            </a>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
