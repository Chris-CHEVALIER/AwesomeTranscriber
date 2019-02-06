exports.requestAnalyzer = function(request) {
  const regex = /^(lance|joue|joue moi|démarre|suivant|prochain|précédent|stop|arrête)? (l'album|musique|la musique|morceau|le morceau|chanson|la chanson)? */gm;
  let m;
  let arr = request.split(regex);
  let command = null;
  //console.log(arr);

  while ((m = regex.exec(request)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    m.forEach((match, groupIndex) => {
      console.log(match);

      if (groupIndex === 1) action = match;
      if (groupIndex === 2) object = match;
    });
    let name = arr[3];
    command = {
      action: action,
      object: object,
      name: name
    };
    return command;
  }
  if (command === null) {
    return "Chaîne non reconnue par l'interpréteur.";
  }
};
