#!/usr/bin/env bash

# Exit script if you try to use an uninitialized variable.
set -o nounset

# Exit script if a statement returns a non-true return value.
set -o errexit

# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

# install required fonts
sudo apt-get update --allow-releaseinfo-change \
sudo apt-get install fontconfig \
sudo apt-get install fonts-liberation2 fonts-open-sans fonts-noto-cjk fonts-noto-color-emoji && \
sudo python3 .circleci/download_google_fonts.py && \
sudo cp -r .circleci/fonts/ /usr/share/ && \
sudo fc-cache -f && \
# install kaleido & plotly
sudo python3 -m pip install kaleido==0.2.1 plotly==5.5.0 --progress-bar off
