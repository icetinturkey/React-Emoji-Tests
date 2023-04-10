import React from "react";
import App from "./App";
import {render,screen, fireEvent, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

describe("Emoji Search Tests",()=>{
  beforeEach(()=>{
    render(<App />); //HER TEST İÇİN TEKRAR BAŞLAT.
  });
  test("Test 1 : header rendering",()=>{
    const _text = screen.getByText(/Emoji Search/i); //{EMOJI SEARCH} YAZAN BAŞLIĞI TANIMLA.
    expect(_text).toBeInTheDocument(); //BU BAŞLIK VAR MI YOK MU KONTROL ET.
  });
  test("Test 2 : emoji-list rendering",()=>{
    const items = document.querySelectorAll('.component-emoji-result-row'); //LİSTELENEN TÜM SATIRLARI ALGILA.
    expect(items.length).toEqual(20); //20 EMOJI SATIRININ HEPSİ MEVCUT MU KONTROL ET.
  });
  test('Test 3 : search working', async () => {
    userEvent.type(screen.getByRole("textbox"),"sunny"); //ARAMA KUTUCUĞUNA {SUNNY} YAZ.
    await new Promise((r) => setTimeout(r, 1000)); //1 SN ARAMA SONUÇLARINI BEKLE.
    const results = document.querySelectorAll('.component-emoji-result-row'); //TÜM SONUÇLARI ALGILA.
    expect(results.length).toEqual(2); //{SUNNY} İÇİN 2 SONUCUN ÇIKTIĞINI KONTROL ET.
  });
  test('Test 4 : emoji-copy working', async () => { //CLIPBOARD API - SUCCESS EVENT ILE KONSOLA LOG YAZDIRIYORUZ. bknz. EmojiResults.js#13
    const consoleLogSpy = jest.spyOn(console, 'log'); //KONSOLA BAĞLAN.
    fireEvent.click(screen.getByText("Grinning")); //{GRINNING} IFADESINE TIKLA.
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Successful Copied')); //KOPYALAMA FONKSIYONU TETIKLENMIS MI KONTROL ET.
  });
});