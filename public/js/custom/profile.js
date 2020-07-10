// not complete
'use strict';

const getLocationDetails = () => {
	fetch("https://ipinfo.io/?token=")
			.then((res) => { return res.json(); })
			.then((res) => {
				const userInfo = {
					loc: res.loc,
					country: res.country,
					postal_code: res.postal,
					city: res.city,
					region: res.region
				}
				fetch("http://localhost:4000/profile/location", {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify(userInfo)
			}).then((res) => { return res.json(); })
				.catch((error) => { console.error('Error', error);});
			})
			.catch(err => console.error("Error: ", err))
}

const whenRejected = (error) => {
	if (error.code === 2) {
		alert("location not supported");
	} else {
		getLocationDetails();
	}
}

(() => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			getLocationDetails();
		}, whenRejected);
	} else {
		alert("location not supported");
	}
})();
