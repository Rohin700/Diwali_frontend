import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {server_url} from './config/url'

import WishesMap from './mapDisplay';

export default function HomePage() {
    
    const[formData, setFormData] = useState(
        {
            name : '',
            city : '',
            message : '',
            wishpic : null,
            emoji : ''
        }
    );

    let handleChange = (e) => {
        var fname = e.target.name;
        
        if(fname == "wishpic"){
            setFormData({
                ...formData,
                ["wishpic"] : e.target.files[0]
            })
            return;
        }

        var value = e.target.value;

        setFormData({
            ...formData,
            [fname] : value
        });
    }

    async function handleSubmit (e) {
        e.preventDefault();

        let url = server_url + "/wish/doSave";
        let fd = new FormData();

        for(let prop in formData){
            if(formData[prop] != undefined && formData[prop] != null){
                fd.append(prop, formData[prop]);
            }
        }

        let resp = await axios.post(url, fd, {headers : {'Content-Type': 'multipart/form-data'}});
        alert(resp.data.msg);
    }

return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex flex-col items-center justify-center overflow-hidden p-6">
      {/* Floating Diyas */}
      <motion.div className="absolute top-10 left-20 text-5xl" animate={{ y: [0, -25, 0] }} transition={{ repeat: Infinity, duration: 3 }}>🪔</motion.div>
      <motion.div className="absolute bottom-20 right-24 text-5xl" animate={{ y: [0, 25, 0] }} transition={{ repeat: Infinity, duration: 3 }}>🪔</motion.div>
      <motion.div className="absolute top-1/4 right-1/3 text-4xl" animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }}>🎆</motion.div>
      <motion.div className="absolute bottom-1/3 left-1/4 text-3xl opacity-60" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>✨</motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 mb-3 tracking-tight"
      >
        Festive Connect
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl text-indigo-700 mb-10 text-center font-medium max-w-2xl"
      >
        Share Your Diwali Greets and Light Up the Map of India ✨
      </motion.p>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-10 items-start">

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full lg:w-2/5 border border-purple-100"
        >
        <div className="mb-5">
          <label className="block text-gray-800 mb-2 font-bold text-sm uppercase tracking-wide">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition bg-gray-50"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-800 mb-2 font-bold text-sm uppercase tracking-wide">City</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={formData.city}
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition bg-gray-50"
            placeholder="Enter your city"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-800 mb-2 font-bold text-sm uppercase tracking-wide">Message</label>
          <textarea
            name="message"
            onChange={handleChange}
            value={formData.message}
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition bg-gray-50 resize-none"
            placeholder="Write your Diwali greeting..."
            rows="4"
            required
          />
        </div>

        <div className="mb-6">
            <label className="block text-gray-800 mb-3 font-bold text-sm uppercase tracking-wide text-center">Your Picture</label>

            <div className="flex flex-col items-center justify-center">
                {formData.wishpic ? (
                    <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        src={URL.createObjectURL(formData.wishpic)}
                        alt="Uploaded Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-lg mb-3"
                    />
                ) : (
                    <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-full border-4 border-dashed border-purple-300 mb-3">
                        <span className="text-5xl text-purple-400">👤</span>
                    </div>
                )}

                <p className="text-sm text-gray-600 mb-3 font-semibold">
                    {formData.wishpic ? "✅ Picture Uploaded" : "📸 Upload Your Picture"}
                </p>

                <label className="cursor-pointer bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-2 px-6 rounded-lg transition">
                    Choose File
                    <input
                        type="file"
                        name="wishpic"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                </label>
            </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 mb-2 font-bold text-sm uppercase tracking-wide">Favorite Emoji</label>
          <input
            type="text"
            name="emoji"
            onChange={handleChange}
            value={formData.emoji}
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition bg-gray-50 text-2xl text-center"
            placeholder="😊 🎆 🪔 🎉"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-xl"
        >
          🎉 Share Your Greeting
        </motion.button>
      </motion.form>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full lg:w-3/5 h-[600px] rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden bg-white"
      >
        <WishesMap />
      </motion.div>
      </div>

    </div>
  );
}