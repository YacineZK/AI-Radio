#!/bin/bash

# Lien du flux principal (RougeFM Saguenay)
rouge_fm="https://playerservices.streamtheworld.com/api/livestream-redirect/CFIXFM.mp3"
backup_station_1="https://18003.live.streamtheworld.com/CFIXFMAAC_SC"
backup_station_2="https://rcavliveaudio.akamaized.net/hls/live/2006988/M-7QSAG0_SAG/playlist.m3u8"

# Fonction pour tester si un flux est actif
check_stream() {
    if curl --silent --fail --max-time 10 --range 0-10 "$1" >/dev/null; then
        return 0  # Flux disponible
    else
        return 1  # Flux non disponible
    fi
}

# Fonction pour jouer le flux avec mplayer
play_stream() {
    mplayer -ao alsa -really-quiet -nolirc "$1" > /dev/null 2>&1
}

# Boucle infinie pour vérifier et jouer les flux en continu
while true; do # changer la bouvle while
    if check_stream "$rouge_fm"; then
        echo "Joue RougeFM"
        play_stream "$rouge_fm"
    elif check_stream "$backup_station_1"; then
        echo "Joue la station de secours 1"
        play_stream "$backup_station_1"
    elif check_stream "$backup_station_2"; then
        echo "Joue la station de secours 2"
        play_stream "$backup_station_2"
    else
        echo "Aucune station disponible, nouvelle tentative dans 30 secondes..."
        sleep 30  # Attendre 30 secondes avant de réessayer si aucun flux n'est disponible
    fi
    sleep 10  # Petite pause entre les vérifications
done