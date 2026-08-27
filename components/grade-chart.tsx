"use client";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
const data=[{m:'Aug',g:88},{m:'Sep',g:90},{m:'Oct',g:89},{m:'Nov',g:92},{m:'Dec',g:93}];
export function GradeChart(){return <div className="h-64 w-full"><ResponsiveContainer><AreaChart data={data} margin={{left:-22,right:8}}><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#5b5ce2" stopOpacity=".3"/><stop offset="100%" stopColor="#5b5ce2" stopOpacity="0"/></linearGradient></defs><XAxis dataKey="m" axisLine={false} tickLine={false}/><YAxis domain={[80,100]} axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="g" stroke="#5b5ce2" strokeWidth={3} fill="url(#fill)"/></AreaChart></ResponsiveContainer></div>}
