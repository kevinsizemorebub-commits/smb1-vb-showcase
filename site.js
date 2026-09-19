const video = document.querySelector('#movie');
const buttons = [document.querySelector('#mono'), document.querySelector('#stereo')];
function changeView(stereo) {
  const time = video.currentTime, resume = !video.paused;
  video.src = stereo ? 'media/world-1-1-stereo.mp4' : 'media/world-1-1.mp4';
  video.poster = stereo ? 'media/02-start-stereo.png' : 'media/02-start.png';
  video.addEventListener('loadedmetadata', () => {video.currentTime = time;if(resume) video.play().catch(()=>{});},{once:true});
  buttons.forEach((b,i)=>{b.classList.toggle('active',Boolean(i)===stereo);b.setAttribute('aria-pressed',String(Boolean(i)===stereo));});
  document.querySelector('#view-label').textContent = (stereo?'Side-by-side stereo':'Single-eye presentation')+' · Game audio included';
}
buttons[0].addEventListener('click',()=>changeView(false));
buttons[1].addEventListener('click',()=>changeView(true));
document.querySelectorAll('[data-time]').forEach(button=>button.addEventListener('click',()=>{video.currentTime=Math.min(Number(button.dataset.time),video.duration-.25);video.play().catch(()=>{});video.scrollIntoView({block:'center'});}));
