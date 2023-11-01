import React from 'react'
import SpinningDots from "./loader.js"
customElements.define("spinning-dots", SpinningDots)
export default function LoaderHtml() {
 const src=require('./images/logo_niintche.webp')
return (
  <div className="demo">
    <img src={src} alt="logo"/>
    <spinning-dots></spinning-dots>
  </div>
)}