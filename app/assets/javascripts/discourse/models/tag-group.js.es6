import RestModel from 'discourse/models/rest';
import computed from 'ember-addons/ember-computed-decorators';

const TagGroup = RestModel.extend({
  @computed('name', 'tag_names')
  disableSave() {
    return Ember.isEmpty(this.get('name')) || Ember.isEmpty(this.get('tag_names')) || this.get('saving');
  },

  save: function() {
    var url = "/tag_groups",
        self = this;
    if (this.get('id')) {
      url = "/tag_groups/" + this.get('id');
    }

    this.set('savingStatus', I18n.t('saving'));
    this.set('saving', true);

    return Discourse.ajax(url, {
      data: {
        name: this.get('name'),
        tag_names: this.get('tag_names')
      },
      type: this.get('id') ? 'PUT' : 'POST'
    }).then(function(result) {
      if(result.id) { self.set('id', result.id); }
      self.set('savingStatus', I18n.t('saved'));
      self.set('saving', false);
    });
  }
});

export default TagGroup;
