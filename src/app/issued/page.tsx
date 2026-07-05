'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NAV = [{icon:'📊',label:'Dashboard',href:'/dashboard'},{icon:'🧪',label:'All Cylinders',href:'/cylinders'},{icon:'🔔',label:'Escalations',href:'/escalations'},{icon:'📤',label:'Issued',href:'/issued'},{icon:'↩',label:'Returned',href:'/returned'}];
const navBtn = (active:boolean) => ({ display:'flex' as const, alignItems:'center' as const, gap:'10px', padding:'9px 12px', borderRadius:'6px', fontSize:'13px', fontWeight:'500', cursor:'pointer' as const, border:'none', marginBottom:'2px', width:'100%', textAlign:'left' as const, background:active?'#E8820C':'transparent', color:'white' });

const ISSUED = [
  { serial:'HE-2024-001', gas:'Helium Gas',           dept:'R&D',        person:'Dr. Rajan K',  desig:'Senior Scientist',      issued:'08/10/2024', days:79,  status:'Overdue' },
  { serial:'CAL-2024-009',gas:'Nitrogen Calibration',  dept:'Maint-Inst', person:'Muthu R',      desig:'Instrument Technician', issued:'18/10/2024', days:69,  status:'Within Limit' },
  { serial:'SP-2024-003', gas:'Argon Special Grade',   dept:'QC Lab',     person:'Priya M',      desig:'QC Analyst',            issued:'03/10/2024', days:83,  status:'GM Escalated' },
  { serial:'HE-2024-007', gas:'Helium Gas',            dept:'R&D',        person:'Dr. Anand V',  desig:'Research Engineer',     issued:'15/08/2024', days:135, status:'GM Escalated' },
];

export default function IssuedPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  useEffect(() => { const s = localStorage.getItem('cpcl_user'); if (!s) { router.push('/login'); return; } setUser(JSON.parse(s)); }, [router]);
  if (!user) return null;

  return (
    <div style={{ display:'flex', minHeight:'100vh', backgroundColor:'#F1F5F9' }}>
      <div style={{ width:'220px', backgroundColor:'#0F2D54', display:'flex', flexDirection:'column', padding:'20px 12px', position:'fixed', height:'100vh', top:0, left:0 }}>
        <div style={{ padding:'8px', marginBottom:'24px' }}>
          <div style={{ color:'white', fontWeight:'800', fontSize:'16px' }}>CPCL <span style={{ color:'#E8820C' }}>CTM</span></div>
          <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'11px' }}>Cylinder Tracking Module</div>
        </div>
        {NAV.map(item => (<button key={item.href} onClick={() => router.push(item.href)} style={navBtn(item.href==='/issued')}><span>{item.icon}</span><span>{item.label}</span></button>))}
        <div style={{ marginTop:'auto', borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'12px' }}>
          <div style={{ color:'white', fontSize:'13px', fontWeight:'600', padding:'4px 8px' }}>{user?.name}</div>
          <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'11px', padding:'0 8px 8px' }}>{user?.role==='admin'?'Administrator':'Normal User'}</div>
          <button onClick={() => { localStorage.removeItem('cpcl_user'); router.push('/login'); }} style={{ width:'100%', padding:'7px', backgroundColor:'transparent', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'6px', color:'rgba(255,255,255,0.6)', fontSize:'12px', cursor:'pointer' }}>Sign out</button>
        </div>
      </div>

      <div style={{ marginLeft:'220px', flex:1, padding:'28px' }}>
        <div style={{ backgroundColor:'white', padding:'16px 24px', borderRadius:'12px', marginBottom:'24px', border:'1px solid #E2E8F0' }}>
          <h1 style={{ fontSize:'20px', fontWeight:'700', color:'#0F2D54' }}>Issued Cylinders</h1>
          <p style={{ fontSize:'13px', color:'#475569', marginTop:'2px' }}>Cylinders currently with departments — {ISSUED.length} active</p>
        </div>

        <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E2E8F0', overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ backgroundColor:'#F8FAFC' }}>
                {['Serial No.','Gas','Department','Issued To','Designation','Issued Date','Days in Custody','Status'].map(h => (
                  <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#334155', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:'1px solid #E2E8F0', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ISSUED.map(c => {
                const sc=c.status==='Within Limit'?'#15803D':c.status==='Overdue'?'#B45309':'#B91C1C';
                const sb=c.status==='Within Limit'?'#DCFCE7':c.status==='Overdue'?'#FEF3C7':'#FEE2E2';
                return (
                  <tr key={c.serial} style={{ borderBottom:'1px solid #F1F5F9' }}>
                    <td style={{ padding:'12px 14px' }}><code style={{ fontSize:'12px', backgroundColor:'#F1F5F9', padding:'2px 6px', borderRadius:'4px', color:'#1E293B' }}>{c.serial}</code></td>
                    <td style={{ padding:'12px 14px', fontSize:'13px', color:'#1E293B', fontWeight:'500' }}>{c.gas}</td>
                    <td style={{ padding:'12px 14px', fontSize:'13px', color:'#334155' }}>{c.dept}</td>
                    <td style={{ padding:'12px 14px', fontSize:'13px', color:'#1E293B', fontWeight:'500' }}>{c.person}</td>
                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#475569' }}>{c.desig}</td>
                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#334155' }}>{c.issued}</td>
                    <td style={{ padding:'12px 14px' }}><span style={{ fontWeight:'700', color:'#1E293B' }}>{c.days}</span><span style={{ color:'#64748B', fontSize:'11px' }}> days</span></td>
                    <td style={{ padding:'12px 14px' }}><span style={{ backgroundColor:sb, color:sc, padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'600' }}>{c.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding:'12px 20px', borderTop:'1px solid #E2E8F0', fontSize:'12px', color:'#475569', fontWeight:'500' }}>Total {ISSUED.length} cylinders currently issued</div>
        </div>
      </div>
    </div>
  );
}
