async function requestRandomGif(api_key, tag, rating) {
    try {
      const res = await axios.get('https://api.giphy.com/v1/gifs/random', {
        params: {
          api_key: api_key,
          tag: tag,
          rating: rating, //rating allows you to search up to a selected rating, no rating selection allows all ratings, R is likely to be unseen unless searching something vulgar/gore
        },
      });
      console.log(res.data);
      return res.data.data.images.original.url;
    } catch (error) {
        console.error('Error fetching GIF: try a different search term', error);
        throw error; //throw error for eventlistener to catch -- else causes blank image to appear
    }
  }

  const ratingElement = document.querySelector("#rating");
  const ratingTooltip = document.querySelector("#rating-tooltip");

  ratingElement.addEventListener("mousemove", function (e) {
    e.preventDefault();
    ratingTooltip.style.display = "block";
    ratingTooltip.style.left = e.pageX + 10 + "px";
    ratingTooltip.style.top = e.pageY + 10 + "px";
  });

  ratingElement.addEventListener("mouseout", function (e) {
    e.preventDefault();
    ratingTooltip.style.display = "none";
  });

const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function(e){
    e.preventDefault();
    const searchInput = document.querySelector("#input").value;
    const selectedRating = document.querySelector("#rating").value;
    try {
        const gifUrl = await requestRandomGif("ZyAYPlTTeuiFFgWGtIvBq4I233FT88KY", searchInput, selectedRating);
        const generatedList = document.querySelector("#generatedList");
        const img = document.createElement("img");
        img.src = gifUrl;
        generatedList.prepend(img);
        form.reset();
      } catch (error) {
        alert('Error fetching GIF: try a different search term');
        form.reset();
      }
    });

    const removeButton = document.querySelector("#remove");
    removeButton.addEventListener("click", function() {
      const generatedList = document.querySelector("#generatedList");
      const listItems = generatedList.getElementsByTagName("img");
      while (listItems.length > 0) {
        generatedList.removeChild(listItems[0]);
      }
    });


//app api_key = ZyAYPlTTeuiFFgWGtIvBq4I233FT88KY
//tag = search term
//rating = g level 1,pg level 2,pg13 level 3,r level 4
