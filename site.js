const video = document.querySelector('#movie');
const buttons = [document.querySelector('#mono'), document.querySelector('#stereo')];
let desiredTime = 0, resumeAfterLoad = false, revision = 0;
function seekAndPlay() {
  if (video.readyState < 1 || !Number.isFinite(video.duration)) return;
  video.currentTime = Math.max(0, Math.min(desiredTime, video.duration - .25));
  if (resumeAfterLoad) video.play().catch(()=>{});
}
function changeView(stereo) {
  desiredTime = video.currentTime;
  resumeAfterLoad = !video.paused;
  const currentRevision = ++revision;
  video.src = stereo ? 'media/world-1-1-stereo.mp4' : 'media/world-1-1.mp4';
  video.poster = stereo ? 'media/02-start-stereo.png' : 'media/02-start.png';
  video.addEventListener('loadedmetadata', () => {if(currentRevision===revision)seekAndPlay();},{once:true});
  buttons.forEach((b,i)=>{b.classList.toggle('active',Boolean(i)===stereo);b.setAttribute('aria-pressed',String(Boolean(i)===stereo));});
  document.querySelector('#view-label').textContent = (stereo?'Side-by-side stereo':'Single-eye presentation')+' · Game audio included';
}
buttons[0].addEventListener('click',()=>changeView(false));
buttons[1].addEventListener('click',()=>changeView(true));
document.querySelectorAll('[data-time]').forEach(button=>button.addEventListener('click',()=>{desiredTime=Number(button.dataset.time);resumeAfterLoad=true;if(video.readyState>=1)seekAndPlay();else video.addEventListener('loadedmetadata',seekAndPlay,{once:true});video.scrollIntoView({block:'center'});}));
