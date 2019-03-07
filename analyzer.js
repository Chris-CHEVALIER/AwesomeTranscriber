// Analyseur syntaxique : prend en argument le fichier audio '.wav' de l'action demandée par l'utilisateur.
exports.requestAnalyzer = function(request) {
  const regex = /^(suivant|stop|précédent|pause|arrête)$|^(lance|joue|démarre|commence|lancer|jouer|démarrer|commencer)( (la (musique|chanson|playlist)|le morceau|l'album))? (.*)$|^(morceau|album) (suivant|précédent)$|^(playlist|chanson|musique) (suivante|précédente)$|/gm;
  let m;

  // Parcout de la regex en fonction de la str passé en argument de la fonction
  while ((m = regex.exec(request)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // On initialise les 3 composants principaux d'une commande vocale
    let action = null; // Ex. : stop, start, next, etc.
    let object = null; // Ex. : album, song, playlist
    let objectName = null; // Ex. : Viva La Vida, Ma Playlist de Noël, Random Access Memory, etc.

    // Affecte les actions, objets (album, morceau, playlist, etc.) et intitulé d'objet de la commande
    m.forEach((match, groupIndex) => {
      if (match != null) {
        switch (groupIndex) {
          case 1:
            action = match;
            break;
          case 2:
            action = match;
            break;
          case 3:
            object = match;
            break;
          case 5:
            object = match;
            break;
          case 6:
            objectName = match;
            break;
          case 7:
            object = match;
            break;
          case 8:
            action = match;
            break;
          case 9:
            object = match;
            break;
          case 10:
            action = match;
        }
      }
    });

    // Cette partie permet de formaliser l'objet renvoyé (Ex. : musique, chanson, morceau = 'song', etc.)
    let words = {
      start: [
        "lance",
        "lancer",
        "joue",
        "jouer",
        "commence",
        "commencer",
        "démarre",
        "démarrer"
      ],
      stop: ["stop", "pause", "arrête"],
      previous: ["précédent", "précédente"],
      next: ["suivant", "suivante"],
      song: [
        "morceau",
        "chanson",
        "musique",
        "morceau",
        "le morceau",
        " le morceau"
      ],
      album: ["album", "l'album", " l'album"],
      playlist: ["playlist", "la playlist", " la playlist"]
    };

    if (words.start.includes(action)) action = "start";
    if (words.stop.includes(action)) action = "stop";
    if (words.previous.includes(action)) action = "previous";
    if (words.next.includes(action)) action = "next";
    if (words.song.includes(object)) object = "song";
    if (words.album.includes(object)) object = "album";
    if (words.playlist.includes(object)) object = "playlist";

    // On créé l'objet à renvoyé avec les 3 composants de la commande audio
    command = {
      action: action,
      object: object,
      objectName: objectName
    };

    // Gère le cas où la chaîne reçu n'est pas reconnu par l'analyseur
    if (action == null && object == null && objectName == null)
      return "Chaîne non reconnue...";
    return command;
  }
};
