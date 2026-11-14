'use client';
import {useEffect} from 'react';
export function SiteExperienceReady(){useEffect(()=>{if(document.getElementById('site-experience-script'))return;const script=document.createElement('script');script.id='site-experience-script';script.src='/site-experience.js?v=20261114growth';script.defer=true;document.body.appendChild(script);},[]);return null;}
