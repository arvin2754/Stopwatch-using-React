import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Timer from "./Timer";
import Hero from "./Hero";

export default function FocusInput() {
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero/>}>
        <Route index element={<App/>}/>
        <Route path="/timer" element={<Timer/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
