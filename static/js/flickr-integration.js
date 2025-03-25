document.addEventListener('DOMContentLoaded', function() {
    console.log('Flickr integration initializing...');
    
    // Album ID for https://www.flickr.com/photos/10271567@N05/albums/72157602336330353
    const FLICKR_ALBUM_ID = '72157602336330353';
    const FLICKR_USER_ID = '10271567@N05';
    
    // Debug info
    console.log('FLICKR_API_KEY available:', !!window.FLICKR_API_KEY);
    console.log('FLICKR_API_KEY value:', window.FLICKR_API_KEY);
    
    // Helper function to update the image and link elements
    function updateImageAndLink(photo) {
        console.log('Updating image with photo:', photo);
        const imgElement = document.querySelector('#flickr-latest img');
        const linkElement = document.querySelector('#flickr-latest-link');
        
        if (imgElement && linkElement) {
            // Construct the image URL using Flickr's format
            const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
            console.log('Setting image URL to:', imageUrl);
            imgElement.src = imageUrl;
            imgElement.alt = 'Photo of Butch Lebo';
            
            // Link directly to the photo in the album context
            linkElement.href = `https://www.flickr.com/photos/${FLICKR_USER_ID}/${photo.id}/in/album-${FLICKR_ALBUM_ID}/`;
            linkElement.textContent = 'View on Flickr';
        } else {
            console.error('Image or link element not found:', {
                imgElement: !!imgElement,
                linkElement: !!linkElement
            });
        }
    }
    
    async function getFlickrPhoto() {
        console.log('Fetching Flickr photo...');
        // Check if API key is available and valid
        if (!window.FLICKR_API_KEY || window.FLICKR_API_KEY === '' || window.FLICKR_API_KEY === 'your-flickr-api-key-here') {
            console.error('Valid Flickr API key not found. Please configure flickrApiKey in your Hugo config.');
            showPlaceholderImage('Flickr API key required');
            return;
        }

        try {
            // Direct approach: Get photos from the album with sorting by date_upload in descending order
            // This ensures we get the most recently added photo first
            const albumResponse = await fetch(
                `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${window.FLICKR_API_KEY}&photoset_id=${FLICKR_ALBUM_ID}&user_id=${FLICKR_USER_ID}&format=json&nojsoncallback=1&per_page=1&page=1&extras=date_upload,date_taken,last_update&sort=date-posted-desc`
            );
            
            const albumData = await albumResponse.json();
            console.log('Album response with sorting:', albumData);
            
            if (albumData.stat !== 'ok') {
                throw new Error(`Failed to fetch album photos: ${albumData.message}`);
            }
            
            if (!albumData.photoset || !albumData.photoset.photo || albumData.photoset.photo.length === 0) {
                throw new Error('No photos found in the album');
            }
            
            // The first photo is the most recently added one due to our sort parameter
            let mostRecentPhoto = albumData.photoset.photo[0];
            console.log('Most recent photo in album:', mostRecentPhoto);
            
            // Double-check with the user's recent photos to ensure we have the absolute latest
            const recentPhotosResponse = await fetch(
                `https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${window.FLICKR_API_KEY}&user_id=${FLICKR_USER_ID}&format=json&nojsoncallback=1&per_page=10&page=1&extras=date_upload&sort=date-posted-desc`
            );
            
            const recentData = await recentPhotosResponse.json();
            
            if (recentData.stat === 'ok' && recentData.photos && recentData.photos.photo && recentData.photos.photo.length > 0) {
                // Find the most recent photo that's in our album
                for (const photo of recentData.photos.photo) {
                    const photoInAlbumResponse = await fetch(
                        `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${window.FLICKR_API_KEY}&photoset_id=${FLICKR_ALBUM_ID}&user_id=${FLICKR_USER_ID}&format=json&nojsoncallback=1&per_page=1&page=1&photo_id=${photo.id}`
                    );
                    
                    const photoInAlbumData = await photoInAlbumResponse.json();
                    
                    if (photoInAlbumData.stat === 'ok' && photoInAlbumData.photoset && photoInAlbumData.photoset.photo && photoInAlbumData.photoset.photo.length > 0) {
                        // This is the most recent photo in the album
                        console.log('Found absolute most recent photo in album:', photo);
                        mostRecentPhoto = photo;
                        break;
                    }
                }
            }
            
            updateImageAndLink(mostRecentPhoto);
        } catch (error) {
            console.error('Error fetching Flickr photos:', error);
            showPlaceholderImage('Could not load Flickr image: ' + error.message);
        }
    }
    
    // Helper function to show placeholder image with error message
    function showPlaceholderImage(altText) {
        const imgElement = document.querySelector('#flickr-latest img');
        if (imgElement) {
            console.log('Setting placeholder image with message:', altText);
            imgElement.src = '/images/placeholder.jpg';
            imgElement.alt = altText;
        } else {
            console.error('Could not find image element to set placeholder');
        }
    }

    // Initialize Flickr integration
    getFlickrPhoto();
});