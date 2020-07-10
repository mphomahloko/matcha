// not complete
'use strict';

const whenRejected = (error) => {
	if (error.code === 2) {
		// alert("location unavailable");
	} else {
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
				console.log(userInfo);
				fetch("http://localhost:4000/profile/location", {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify(userInfo)
			}).then((res) => { return res.json(); })
				.then(checkResponce)
				.catch((error) => { console.error('Error', error);});
				console.log(res.loc);
			})
			.catch(err => console.error("Error: ", err))
	}
}

(() => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			whenRejected
		}, whenRejected);
	} else {
		// alert("location unavailable");
	}
})();
