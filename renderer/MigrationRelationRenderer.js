import Renderer from './Renderer';
import * as _ from 'lodash';
class MigrationRelationRenderer extends Renderer {
    constructor(table) {
        var d = new Date();
        var d_str = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "_" + (Date.now() % 300000 + 600000);
        super("../../database/migrations/" + d_str + "_relation_" + table.name_raw.replace("___", "_xxxx_").replace("__", "_xxx_") + "_table.php");
        this.table = table;
    }
    getRenderStr() {
        let res = `<?php

use Illuminate\\Support\\Facades\\Schema;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Database\\Migrations\\Migration;

class Relation${this.table.name.replace("__", "Xxxx").replace("_", "Xxx")}Table extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('${this.table.name_raw}', function (Blueprint $table) {
      ${_.map(this.table.childRelations, (x) => x.renderChild("Migration")).join("\n\n")}
      ${_.map(this.table.parentRelations, (x) => x.renderParent("Migration")).join("\n\n")}
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('${this.table.name_raw}', function (Blueprint $table) {
      ${_.map(this.table.childRelations, (x) => x.renderChild("MigrationDown")).join("\n\n")}
      ${_.map(this.table.parentRelations, (x) => x.renderParent("MigrationDown")).join("\n\n")}
    });
  }

}
`;
        return res;
    }
    ;
    renderParts() {
    }
    ;
}
export default MigrationRelationRenderer;
//# sourceMappingURL=MigrationRelationRenderer.js.map