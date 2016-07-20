provision-production:
	ansible-playbook ansible/provision.yml \
    -i ansible/production_inventory \
		--ask-vault-pass

deploy-production:
	ansible-playbook ansible/deploy.yml \
    -i ansible/production_inventory \
		--ask-vault-pass
