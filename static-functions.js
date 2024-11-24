import Sound from "react-native-sound";

const saveAudioFile = (base64Audio) => {
    const path = `${RNFS.DocumentDirectoryPath}/audio-${Date.now()}.mp3`;
    RNFS.writeFile(path, base64Audio, 'base64')
        .then(() => console.log('Audio file saved:', path))
        .catch((error) => console.error('Error saving audio file', error));
    return path;
};

const playAudio = (audioPath) => {
    const sound = new Sound(audioPath, '', (error) => {
        if (error) {
            console.error('Failed to load the sound', error);
            return;
        }
        sound.play((success) => {
            if (!success) {
                console.error('Playback failed');
            }
            sound.release();
        });
    });
};

export {
    saveAudioFile,
    playAudio
}