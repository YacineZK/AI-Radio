# Liens des flux
rouge_fm = "https://playerservices.streamtheworld.com/api/livestream-redirect/CFIXFM.mp3"
backup_station_1 = "https://18003.live.streamtheworld.com/CFIXFMAAC_SC"
backup_station_2 = "https://rcavliveaudio.akamaized.net/hls/live/2006988/M-7QSAG0_SAG/playlist.m3u8"

# Définir les flux comme sources avec détection de silence
rouge_fm_stream = input.http(rouge_fm, fallible=true)
backup_station_1_stream = input.http(backup_station_1, fallible=true)
backup_station_2_stream = input.http(backup_station_2, fallible=true)

# Ajouter la détection de silence au flux principal RougeFM
rouge_fm_with_silence_detection = 
  detect_silence(
    rouge_fm_stream,
    duration=5.,  # Temps à attendre avant de détecter un silence (en secondes)
    on_detect=fun(_){ log("Silence détecté sur RougeFM, basculement...") },
    on_resume=fun(_){ log("RougeFM est de nouveau actif, retour à la station principale.") }
  )

# Utiliser un fallback pour basculer vers les flux de secours si RougeFM est indisponible ou silencieux
stream_with_priority = 
  fallback(
    [
      rouge_fm_with_silence_detection,  # Priorité au flux RougeFM s'il est actif et non silencieux
      backup_station_1_stream,          # Sinon, passer à la station de secours 1
      backup_station_2_stream           # Sinon, passer à la station de secours 2
    ]
  )

# Envoyer la sortie audio à la carte son par défaut via ALSA
output.alsa(device="default", stream_with_priority)
