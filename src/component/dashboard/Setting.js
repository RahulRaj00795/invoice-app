import React, { useRef, useState } from 'react'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
const Setting = () => {
    const fileInputRef = useRef(null)

    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null)
    const [displayName, setDisplayName] = useState(localStorage.getItem('cName'))
    const [imageUrl, setImageUrl] = useState(localStorage.getItem('photoURL'))

    const updateCompanyName = () => {
        updateProfile(auth.currentUser, {
            displayName: displayName
        })
            .then(res => {

                localStorage.setItem('cName', displayName)
                updateDoc(doc(db, "users", localStorage.getItem('uid')), {
                    displayName: displayName
                })
                    .then(res => {
                        window.location.reload();
                    })
            })
    }

    const onSelectFile = (e) => {
        setFile(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const updateLogo = () => {
        const fileRef = ref(storage, localStorage.getItem('photoURL'))
        console.log(fileRef._location.path_)
        const storageRef = ref(storage, fileRef._location.path_)
        uploadBytesResumable(storageRef, file)
            .then(result => {
                window.location.reload();
                // getDownloadURL(storageRef)
                //     .then(downloadedURL => {
                //         updateProfile(localStorage.getItem('uid'), {
                //             photoURL: downloadedURL
                //         })
                //         localStorage.setItem('photoURL', downloadedURL)
                //     })

            })
    }

    return (
        <div>
            <p>Setting</p>
            <div className='setting-wrapper'>
                <div className='profile-info update-cName'>
                    <img onClick={() => { fileInputRef.current.click() }} className='pro' alt='profile-pic' src={imageUrl} />
                    <input onChange={(e) => { onSelectFile(e) }} style={{ display: 'none' }} type='file' ref={fileInputRef} />
                    {file && <button onClick={() => { updateLogo() }} style={{ width: '30%', padding: '10px', backgroundColor: 'hotpink' }}>UpdateProfile Pic </button>}

                </div>
                <div className='update-cName'>
                    <input onChange={e => { setDisplayName(e.target.value) }} type='text' placeholder='Company Name' value={displayName}></input>
                    <button onClick={updateCompanyName}>Update Company Name</button>
                </div>
            </div>
        </div>
    )
}

export default Setting
