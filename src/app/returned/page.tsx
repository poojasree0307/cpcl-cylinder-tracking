'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NAV = [{icon:'📊',label:'Dashboard',href:'/dashboard'},{icon:'🧪',label:'All Cylinders',href:'/cylinders'},{icon:'🔔',label:'Escalations',href:'/escalations'},{icon:'📤',label:'Issued',href:'/issued'},{icon:'↩',label:'Returned',href:'/returned'}];
const navBtn = (active:boolean) => ({ display:'flex' as const, alignItems:'center' as const, gap:'10px', padding:'9px 12px', borderRadius:'6px', fontSize:'13px', fontWeight:'500', cursor:'pointer' as const, border:'none', marginBottom:'2px', width:'100%', textAlign:'left' as const, background:active?'#E8820C':'transparent', color:'white' });

const RETURNED = [
  { serial:'AM-2024-005', gas:'Ammonia Anhydrous', supplier:'BOC India', dept:'MFG-CDU', person:'Suresh P', returnedFrom:'01/11/2024', returnedTo:'04/11/2024', gatePass:'GP-2024-312', rental:1800 },
];

export default function ReturnedPage() {
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
        {NAV.map(item => (<button key={item.href} onClick={() => router.push(item.href)} style={navBtn(item.href==='/returned')}><span>{item.icon}</span><span>{item.label}</span></button>))}
        <div style={{ marginTop:'auto', borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'12px' }}>
          <div style={{ color:'white', fontSize:'13px', fontWeight:'600', padding:'4px 8px' }}>{user?.name}</div>
          <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'11px', padding:'0 8px 8px' }}>{user?.role==='admin'?'Administrator':'Normal User'}</div>
          <button onClick={() => { localStorage.removeItem('cpcl_user'); router.push('/login'); }} style={{ width:'100%', padding:'7px', backgroundColor:'transparent', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'6px', color:'rgba(255,255,255,0.6)', fontSize:'12px', cursor:'pointer' }}>Sign out</button>
        </div>
      </div>

      <div style={{ marginLeft:'220px', flex:1, padding:'28px' }}>
        <div style={{ backgroundColor:'white', padding:'16px 24px', borderRadius:'12px', marginBottom:'24px', border:'1px solid #E2E8F0' }}>
          <h1 style={{ fontSize:'20px', fontWeight:'700', color:'#0F2D54' }}>Returned Cylinders</h1>
          <p style={{ fontSize:'13px', color:'#475569', marginTop:'2px' }}>Cylinders successfully returned to vendor</p>
        </div>

        <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E2E8F0', overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ backgroundColor:'#F8FAFC' }}>
                {['Serial No.','Gas','Supplier','Department','Returned By','Return from User','Return to Vendor','Gate Pass No.','Final Rental','Status'].map(h => (
                  <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#334155', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:'1px solid #E2E8F0', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RETURNED.map(c => (
                <tr key={c.serial} style={{ borderBottom:'1px solid #F1F5F9' }}>
                  <td style={{ padding:'12px 14px' }}><code style={{ fontSize:'12px', backgroundColor:'#F1F5F9', padding:'2px 6px', borderRadius:'4px', color:'#1E293B' }}>{c.serial}</code></td>
                  <td style={{ padding:'12px 14px', fontSize:'13px', color:'#1E293B', fontWeight:'500' }}>{c.gas}</td>
                  <td style={{ padding:'12px 14px', fontSize:'12px', color:'#334155' }}>{c.supplier}</td>
                  <td style={{ padding:'12px 14px', fontSize:'12px', color:'#334155' }}>{c.dept}</td>
                  <td style={{ padding:'12px 14px', fontSize:'13px', color:'#1E293B', fontWeight:'500' }}>{c.person}</td>
                  <td style={{ padding:'12px 14px', fontSize:'12px', color:'#334155' }}>{c.returnedFrom}</td>
                  <td style={{ padding:'12px 14px', fontSize:'12px', color:'#334155' }}>{c.returnedTo}</td>
                  <td style={{ padding:'12px 14px' }}><code style={{ fontSize:'12px', backgroundColor:'#F1F5F9', padding:'2px 6px', borderRadius:'4px', color:'#1E293B' }}>{c.gatePass}</code></td>
                  <td style={{ padding:'12px 14px', fontWeight:'700', color:'#B91C1C', fontSize:'13px' }}>₹{c.rental.toLocaleString('en-IN')}</td>
                  <td style={{ padding:'12px 14px' }}><span style={{ backgroundColor:'#E8F0F9', color:'#0F2D54', padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'600' }}>↩ Returned</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding:'12px 20px', borderTop:'1px solid #E2E8F0', fontSize:'12px', color:'#475569', fontWeight:'500' }}>Total {RETURNED.length} cylinder(s) returned to vendor</div>
        </div>
      </div>
    </div>
  );
}
