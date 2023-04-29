// #FIREBASEAUTH Need to install firebase-admin from npm
import admin from "firebase-admin";

// #FIREBASEAUTH service account file can be downloaded somewhere from firebase application console
import serviceAccount from "./serviceAccounts.json" assert { type: "json" };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://synth-6f232-default-rtdb.firebaseio.com",
// });

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "synth-6f232",
    private_key_id: "3682fb772586340db57677869c1bcee603219754",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9g0VuN+wN0/QX\nneJt8TJYM5on5jf9n3ZZMhzqbCsnX0xCD2hJ/fOKF1q176jIUe4xEOGknxCwGlQ3\nBBT978V0Ybg9CHjMWb4fYkPCJoYdgyXjXmdCz5lSHL0qkjiZKhw9Rp+KGS8YgZm+\n89CbLTZe7Yi90jUibAQ81qOP6WJqpa8JqZ+e2MQzP0mBWDeL864zCIQ28f1OnW5P\nUDoxemqe1mv502/LUAwPCzQaZ86sSRhuI7DLbxU0c9Xux4tO86LYABu3d5JgrO+K\n0gB0BZkymxxIIRAEMhnnwMhFjHLIRu2Ew5bH6NK+EQNTOiqKvGhpirxMgs3r1Thw\nsLXmc6GdAgMBAAECggEAShG4/MOZnKv3LpXUTnEjYqrEeQy3XIbLPEBkYdEmKqzK\nAtW/xo+ddJ79IrfJSYYQKRg2gN90p8eam6gaRkfE7mBVIHGjuQboUp7W6dahu34r\nPEsE4+18uMWnv7BHs8FsKRzltRVzvUnGHAZyRXwt0HtZYwt6HfqGy3p+kfw/LXvo\nR6tIueXk4wVis99ZrrKyjaNR1TBpwqhhSyTzWGJhpFIA9iVgyt50YY1tmmT578BP\ntXCyYAOnMf20jN2A2LEDIX45RgpthlRULar8o6MrdBbsEnVBksDxwfLiEpG2D4R4\n3+21H3cgIpwIEgSOlgPJr5/iQDc5VgCDllR3SfcxRwKBgQDyzEjBO7FsX94HOHKT\nIubZ9BEzf7vtK8Ira9nJgP82iMdscUEU00PUZtubtIKN5gonJBP1Mp7HTSdXchxi\nL35Ylu+cHovQX88y0ttKojstOsF9PQ7K/WnDDUh5uUpPPGDTYx2l/KrumeqdQejb\nDIyl3Qi88iH48Xl4TQjUMhKX0wKBgQDH0UOU0nl0Joe0dR8YGW5w+AXEdHyMce4n\n9BsVAMIu2Nyeb94HMaSDfnOTQ0Ec2PPqWciTMA2Ap0BGjY75d8ofsC7WrOXJGg7w\nccB3x0TBrVGL9dM64xuMChJTCnL0dLOfKsWv5iEJWQiLN1MnR6x3odXEKmK8P+zt\na5HMSEzqzwKBgCxabR//i5XEnYasJSIDyjAeidXii63zxHCyLwLEcdrAec2xkrX/\nMfDnKU70VrUdRNWJnau5J5A44+rxiYXWLzp3uCXI3rmeBve91Rl5MV490YLTWJR0\nXpGnJ4o08wIugXGcNZpQ4djcfSNlGuiJDlhuXF5HzTTwx8PWLrq0uvjJAoGALk0N\nTeTfg8yR0Xz6MYljEAZIv9cGLT0RJGzqAZnlZRmXNZdSaXRVXKrmeQ8yfU7AZmNb\nmM+fsVoQCMkwghoB2gnnMJNrw4eoQor5QEgKZJ6WsMnLom+RqIeE630WWhLYtF8i\n47l9mj7pPekZ+ZYgHrB/ai8wJdLiQbmVVTLDr/0CgYEApekPB/qavKe96V5nSIQl\nJu0xdHUHlYb9Dybm/Y7QamkopnYjQnPFh1Hds8w9lP2bKhA06760OIiYpMelBNkH\nRZf/YHVEibQ1ox0USr9bkvyXmD7/Pdti1KvXV05DdUrSbdTfmV/xRmZKS5XrhxaG\neJNCPApOsF26dz0RNWK3gpw=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-j9ohw@synth-6f232.iam.gserviceaccount.com",
    client_id: "110361275180675380515",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j9ohw%40synth-6f232.iam.gserviceaccount.com",
  }),
  databaseURL: "https://synth-6f232-default-rtdb.firebaseio.com",
});

export default admin;
