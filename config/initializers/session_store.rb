# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key    => '_iTBD_session',
  :secret => 'd65052a1b6e12200a569fe7bd2e15e1edcae1e1dbcc72534ac7376718019d1e9b03fde73014d79dad2d02b0941696eb8c3f8faf363c9afa383cea7246ea9e073'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
