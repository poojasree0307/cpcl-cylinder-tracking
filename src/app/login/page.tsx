'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const API = 'http://localhost:4000/api';
const USERS_DEFAULT = [{username:'admin',password:'admin123',name:'Admin User',role:'admin'},{username:'pooja',password:'cpcl2024',name:'Pooja S',role:'user'}];
export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleLogin() {
    setError(''); setLoading(true);
    try {
      const res = await fetch(API+'/login', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
      const data = await res.json();
      if (res.ok) { localStorage.setItem('cpcl_user', JSON.stringify(data.user)); router.push('/dashboard'); }
      else { setError(data.error || 'Invalid credentials'); }
    } catch(e) {
      const found = USERS_DEFAULT.find(u=>u.username===username&&u.password===password);
      if (found) { localStorage.setItem('cpcl_user', JSON.stringify({name:found.name,role:found.role,username:found.username})); router.push('/dashboard'); }
      else { setError('Invalid username or password!'); }
    } finally { setLoading(false); }
  }
  async function handleSignup() {
    setError(''); setSuccess(''); setLoading(true);
    if (!name.trim()) { setError('Enter full name'); setLoading(false); return; }
    if (!username.trim()) { setError('Enter username'); setLoading(false); return; }
    if (!password) { setError('Enter password'); setLoading(false); return; }
    if (password !== confirmPwd) { setError('Passwords do not match'); setLoading(false); return; }
    if (password.length < 6) { setError('Password min 6 characters'); setLoading(false); return; }
    try {
      const res = await fetch(API+'/signup', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password,name,role})});
      const data = await res.json();
      if (res.ok) { setSuccess('Account created! You can now login.'); setMode('login'); setPassword(''); setName(''); setConfirmPwd(''); }
      else { setError(data.error || 'Signup failed'); }
    } catch(e) {
      const registered = JSON.parse(localStorage.getItem('cpcl_registered_users')||'[]');
      registered.push({name,username,password,role});
      localStorage.setItem('cpcl_registered_users', JSON.stringify(registered));
      setSuccess('Account created! You can now login.');
      setMode('login'); setPassword(''); setName(''); setConfirmPwd('');
    } finally { setLoading(false); }
  }
  const inp = {width:'100%',padding:'11px 14px',border:'1.5px solid #E2E8F0',borderRadius:'8px',fontSize:'14px',outline:'none',color:'#1E293B',backgroundColor:'white'};
  return (
    <div style={{minHeight:'100vh',display:'flex'}}>
      <div style={{width:'360px',backgroundColor:'#0F2D54',display:'flex',flexDirection:'column',justifyContent:'center',padding:'48px 32px'}}>
        <div style={{textAlign:'center',marginBottom:'28px'}}>
          <h1 style={{color:'white',fontSize:'24px',fontWeight:'800',margin:'0 0 4px'}}>CPCL <span style={{color:'#E8820C'}}>CTM</span></h1>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',margin:0}}>Cylinder Tracking Module</p>
        </div>
        <div style={{backgroundColor:'rgba(255,255,255,0.08)',borderRadius:'12px',padding:'16px',marginBottom:'14px'}}>
          <div style={{color:'#E8820C',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',marginBottom:'10px'}}>Demo Credentials</div>
          <div style={{marginBottom:'8px'}}><div style={{color:'rgba(255,255,255,0.4)',fontSize:'10px'}}>ADMIN</div><div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>admin / admin123</div></div>
          <div><div style={{color:'rgba(255,255,255,0.4)',fontSize:'10px'}}>NORMAL USER</div><div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>pooja / cpcl2024</div></div>
        </div>
        <div style={{backgroundColor:'rgba(255,255,255,0.08)',borderRadius:'12px',padding:'16px'}}>
          <div style={{color:'#E8820C',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',marginBottom:'10px'}}>Role Permissions</div>
          <div style={{marginBottom:'8px',display:'flex',gap:'8px'}}><span>👑</span><div><div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>Admin</div><div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px'}}>Add, Edit + Settings</div></div></div>
          <div style={{display:'flex',gap:'8px'}}><span>👤</span><div><div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>Normal User</div><div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px'}}>View only</div></div></div>
        </div>
      </div>
      <div style={{flex:1,backgroundColor:'#F1F5F9',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px'}}>
        <div style={{width:'100%',maxWidth:'400px'}}>
          <div style={{textAlign:'center',marginBottom:'20px'}}><div style={{fontSize:'18px',fontWeight:'800',color:'#0F2D54'}}>CPCL <span style={{color:'#E8820C'}}>CTM</span></div><div style={{color:'#64748B',fontSize:'12px'}}>Chennai Petroleum Corporation Limited</div></div>
          <div style={{display:'flex',backgroundColor:'white',borderRadius:'10px',padding:'4px',marginBottom:'20px',border:'1px solid #E2E8F0'}}>
            <button onClick={()=>{setMode('login');setError('');setSuccess('');}} style={{flex:1,padding:'10px',borderRadius:'8px',border:'none',cursor:'pointer',fontSize:'14px',fontWeight:'600',backgroundColor:mode==='login'?'#0F2D54':'transparent',color:mode==='login'?'white':'#64748B'}}>Sign In</button>
            <button onClick={()=>{setMode('signup');setError('');setSuccess('');}} style={{flex:1,padding:'10px',borderRadius:'8px',border:'none',cursor:'pointer',fontSize:'14px',fontWeight:'600',backgroundColor:mode==='signup'?'#0F2D54':'transparent',color:mode==='signup'?'white':'#64748B'}}>Sign Up</button>
          </div>
          {success&&<div style={{backgroundColor:'#DCFCE7',border:'1px solid #86EFAC',borderRadius:'8px',padding:'10px 14px',marginBottom:'14px',color:'#15803D',fontSize:'13px'}}>✓ {success}</div>}
          {error&&<div style={{backgroundColor:'#FEE2E2',border:'1px solid #FECACA',borderRadius:'8px',padding:'10px 14px',marginBottom:'14px',color:'#B91C1C',fontSize:'13px'}}>⚠ {error}</div>}
          <div style={{backgroundColor:'white',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0'}}>
          {mode==='login'?(
            <div>
              <h2 style={{fontSize:'18px',fontWeight:'700',color:'#0F2D54',marginBottom:'4px'}}>Welcome back!</h2>
              <p style={{color:'#64748B',fontSize:'13px',marginBottom:'18px'}}>Sign in to access the system</p>
              <div style={{marginBottom:'12px'}}><label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'5px'}}>Username</label><input placeholder='Enter username' value={username} onChange={e=>setUsername(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} style={inp}/></div>
              <div style={{marginBottom:'18px'}}><label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'5px'}}>Password</label><input type='password' placeholder='Enter password' value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} style={inp}/></div>
              <button onClick={handleLogin} disabled={loading} style={{width:'100%',padding:'12px',backgroundColor:'#0F2D54',color:'white',border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:'700',cursor:'pointer',marginBottom:'12px',opacity:loading?0.7:1}}>{loading?'Signing in...':'Sign In'}</button>
              <p style={{textAlign:'center',fontSize:'13px',color:'#64748B',margin:0}}>No account? <span onClick={()=>{setMode('signup');setError('');}} style={{color:'#E8820C',fontWeight:'600',cursor:'pointer'}}>Sign Up</span></p>
            </div>
          ):(
            <div>
              <h2 style={{fontSize:'18px',fontWeight:'700',color:'#0F2D54',marginBottom:'4px'}}>Create Account</h2>
              <p style={{color:'#64748B',fontSize:'13px',marginBottom:'18px'}}>Register to access the system</p>
              <div style={{marginBottom:'12px'}}><label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'5px'}}>Full Name</label><input placeholder='Enter your full name' value={name} onChange={e=>setName(e.target.value)} style={inp}/></div>
              <div style={{marginBottom:'12px'}}><label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'5px'}}>Username</label><input placeholder='Choose a username' value={username} onChange={e=>setUsername(e.target.value)} style={inp}/></div>
              <div style={{marginBottom:'12px'}}><label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'5px'}}>Role</label><select value={role} onChange={e=>setRole(e.target.value)} style={inp}><option value='user'>Normal User - View only</option><option value='admin'>Admin - Full access</option></select><div style={{marginTop:'4px',fontSize:'11px',color:'#64748B'}}>{role==='admin'?'👑 Add, edit and settings':'👤 View only'}</div></div>
              <div style={{marginBottom:'12px'}}><label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'5px'}}>Password</label><input type='password' placeholder='Min 6 characters' value={password} onChange={e=>setPassword(e.target.value)} style={inp}/></div>
              <div style={{marginBottom:'18px'}}><label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'5px'}}>Confirm Password</label><input type='password' placeholder='Re-enter password' value={confirmPwd} onChange={e=>setConfirmPwd(e.target.value)} style={inp}/></div>
              <button onClick={handleSignup} disabled={loading} style={{width:'100%',padding:'12px',backgroundColor:'#0F2D54',color:'white',border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:'700',cursor:'pointer',marginBottom:'12px',opacity:loading?0.7:1}}>{loading?'Creating...':'Create Account'}</button>
              <p style={{textAlign:'center',fontSize:'13px',color:'#64748B',margin:0}}>Have account? <span onClick={()=>{setMode('login');setError('');}} style={{color:'#E8820C',fontWeight:'600',cursor:'pointer'}}>Sign In</span></p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}