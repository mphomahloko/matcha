// motivation https://web.dev/geolocation-on-start/
'use strict';

const options = {
  enableHighAccuracy: true,
  timeout: 5e3,
  maximumAge: 0
};

const getLocationDetails = () => {
				fetch("http://localhost:4000/profile/location", {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify({})
			}).then((res) => { return res.json(); })
			.catch((error) => { console.error('Error', error);});
}

const whenRejected = (error) => {
	if (error.code === 1) {
		getLocationDetails();
	} else if (error.code === 2) {
		// alert("location not supported");
	} else {
		// timeout
	}
}

const getUserlocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
			getLocationDetails();
		}, whenRejected, options);
	} else {
		// alert("location not supported");
	}
};

document.querySelector('.user_location').addEventListener('click', getUserlocation);
