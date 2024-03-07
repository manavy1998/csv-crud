import { module, test } from 'qunit';
import { setupRenderingTest } from 'csv-crud/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | csv-grid', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CsvGrid />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <CsvGrid>
        template block text
      </CsvGrid>
    `);

    assert.dom().hasText('template block text');
  });
});
