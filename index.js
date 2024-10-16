const fs = require('fs');
const path = require('path');

const saveData = (jsonFilePath, folderName, overwrite = false) => {
  const fullJsonPath = path.join(__dirname, jsonFilePath);

  if (!fs.existsSync(fullJsonPath)) {
    console.error('Plik JSON nie istnieje.');
    return;
  }

  const rawData = fs.readFileSync(fullJsonPath);
  const users = JSON.parse(rawData);

  const folderPath = path.join(__dirname, folderName);

  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);

    if (files.length > 0 && overwrite) {
      console.log('Folder już istnieje i zawiera pliki. Ustaw overwrite na true, aby nadpisać.');
      return;
    }
  } else {
    fs.mkdirSync(folderPath);
  }

  users.forEach(user => {
    const fileName = `${user.id}-${user.name}-${user.surname}.txt`;
    const filePath = path.join(folderPath, fileName);

    const userData = `Name: ${user.name}\nSurname: ${user.surname}\nStreet: ${user.address.street}\nZip Code: ${user.address.zipcode}\nCity: ${user.address.city}\nPhone: ${user.phone}`;

    fs.writeFileSync(filePath, userData);
  });

  console.log(`Dane zostały zapisane do folderu ${folderName}.`);
};

saveData('2-read-write-users.json', 'outputFolder', true);
