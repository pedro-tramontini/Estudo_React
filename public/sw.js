const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}


self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BERTxXVYTHDpUq6fB8QyfGzKsAaX_ZZXHYeSL1yDXVIP7oIsOej7FVuh0WNLIrOxNxIg6Wnox3bI2e4qpdzWzMg"),
        body: JSON.stringify(subscription)
    })
    console.log(subscription)
})

// Public Key:
// BERTxXVYTHDpUq6fB8QyfGzKsAaX_ZZXHYeSL1yDXVIP7oIsOej7FVuh0WNLIrOxNxIg6Wnox3bI2e4qpdzWzMg

// Private Key:
// QuNLbCazx_U_PbiIcm1UwTLE-oCnQH6oy8EL3WHCrko