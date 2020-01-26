const submitReview = (e) => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    
    const options = {
      method: 'POST',
      body: JSON.stringify({ review }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }
  
    const emojiSection = document.getElementById('emojiSection');
    const title = document.getElementById('title');
    const outline = document.querySelector(':focus');
  
    fetch('/api/nlp/s-analyzer', options)
      .then(res => res.json())
      .then (({ analysis }) => {
        if (analysis < 0) {
          emojiSection.innerHTML = '<img src="https://img.icons8.com/emoji/96/000000/angry-face.png">';
          title.style.color = 'red';
          outline.style.borderColor = 'red';
          title.innerHTML = "We're sorry";
        };
        if (analysis === 0) {
          emojiSection.innerHTML = '<img src="https://img.icons8.com/officel/80/000000/neutral-emoticon.png">';
          title.style.color = '#00367c';
          outline.style.borderColor = '#00367c';
          title.innerHTML = "We'll make it better next time";
        }
        if (analysis > 0) {
          emojiSection.innerHTML = '<img src="https://img.icons8.com/color/96/000000/happy.png">';
          title.style.color = 'green';
          title.innerHTML = "We're glad you enjoyed it";
        }
      })
      .catch(err => {
        console.log(err)
        emojiSection.innerHTML = 'There was an error processing your request!'
      })
  }
  
  document.getElementById('review').addEventListener('keyup', submitReview);
  document.getElementById('reviewForm').addEventListener('submit', submitReview);