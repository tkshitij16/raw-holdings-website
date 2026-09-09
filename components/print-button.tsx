'use client';
export function PrintButton({className='print-button',children='Print / Save as PDF'}:{className?:string;children?:React.ReactNode}){return <button className={className} onClick={()=>window.print()}>{children}</button>}
