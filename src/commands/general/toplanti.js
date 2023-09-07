const { SlashCommandBuilder: Builder } = require('@discordjs/builders');
const Toplanti = require("../../models/Toplanti");

module.exports = {
    data: new Builder()
        .setName("toplanti")
        .setDescription("Toplantı oluştur")
        .addStringOption(option => option.setName("tarih").setDescription("Toplantı tarihi (örn. 23.05.2023)").setRequired(true))
        .addStringOption(option => option.setName("saat").setDescription("Toplantı saati (örn. 23:59)").setRequired(true))
        .addStringOption(option => option.setName("metin").setDescription("Toplantı metni").setRequired(false)),
    execute: (client, interaction) => {
        let tarih = interaction.options.getString("tarih");
        let saat = interaction.options.getString("saat");
        let metin = interaction.options.getString("metin");

        if (!tarih || !saat) return interaction.reply("Lütfen tarih ve saat giriniz.");

        //Check if the tarih is the right string format
        if (RegExp(/\d{2}\.\d{2}\.\d{4}/).test(tarih)) {
            //change . to - and reverse the string
            tarih = tarih.split(".").reverse().join("-")
            let date = new Date(tarih);
            if (isNaN(date.getTime())) {
                return interaction.reply("Lütfen tarihi doğru formatta giriniz. (örn. 23.05.2023)");
            }

            if (RegExp(/\d{2}\:\d{2}/).test(saat)) {
                date = new Date(`${tarih}T${saat}:00Z`);

                if (isNaN(date.getTime())) {
                    return interaction.reply("Lütfen saati doğru formatta giriniz. (örn. 23:59)");
                }

                //Convert the date to turkish time
                date.setHours(date.getHours() - 3);

                //Check if the date is in the past
                if (date.getTime() < Date.now()) {
                    return interaction.reply("Toplantı tarihi geçmişte olamaz.");
                }

                //Send the date to the channel
                date = String(date.getTime()).slice(0, -3);
                interaction.reply(`Toplantı tarihi: <t:${date}:F>${metin ? `\n${metin}` : ""}`);

                //Save the date to the database
                const toplanti = new Toplanti({
                    tarih: date,
                    metin: metin,
                    kanal: interaction.channelId
                });

                toplanti.save().then(() => {console.logDate("Toplanti basariyla kaydedildi.")}).catch(err => console.log(err));

                //set a timer to send the message
                // setTimeout(() => {
                //     interaction.channel.send(`Toplantı başladı! <@&${metin}>`);
                //     toplanti.deleteOne({tarih: date}).then(() => {console.logDate("Toplanti basariyla silindi.")}).catch(err => console.log(err));
                // }, date - Date.now());
            } else {
                return interaction.reply("Lütfen saati doğru formatta giriniz. (örn. 23:59)");
            }
        } else {
            return interaction.reply("Lütfen tarihi doğru formatta giriniz. (örn. 23.05.2023)");
        }
    }
}