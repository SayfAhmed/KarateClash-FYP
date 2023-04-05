var audio=new Audio('https://vgmsite.com/soundtracks/kingdom-hearts-hd-1.5-2.5-remix-original-soundtrack-box-2014/eetmhzjfqa/7-11%20Darkness%20of%20the%20Unknown.mp3')
audio.loop=true;
audio.play()

function changeMusic(){
    audio = new Audio('https://vgmsite.com/soundtracks/kingdom-hearts-hd-2.5-remix/sgwlmegpgq/4-10%20A%20Fight%20to%20the%20Death.mp3')
    audio.loop=true;
    audio.play()
}