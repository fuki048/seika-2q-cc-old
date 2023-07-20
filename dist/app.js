/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
//=============================================================================
// FaceAnimetion.js
//=============================================================================

/*:ja
 * v0.1.0
 * @plugindesc
 * 顔グラのアニメーションを行う
 *
 * @author オオホタルサイコ
 *
 * @param FaceIndex
 * @default 0
 * @desc 表示する顔グラのインデックス番号
 *
 * @param EyeAnmCnt
 * @default 4
 * @desc 目のアニメーション数
 *
 * @param MouthAnmCnt
 * @default 2
 * @desc 口のアニメーション数
 *
 * @param FaceWidth
 * @default 144
 * @desc 顔グラの横幅
 *
 * @param FaceHeight
 * @default 144
 * @desc 顔グラの縦幅
 *
 * @param OffsetX
 * @default 18
 * @desc 顔グラの調整X座標
 *
 * @param OffsetY
 * @default 0
 * @desc 顔グラの調整Y座標
 *
 * @param DispFace
 * @default 0
 * @desc 顔グラの表示場所
 *
 * @help
 * ■概要
 * FaceAnimetionプラグインを利用するにはプラグインコマンドから実行します。
 * プラグインコマンドを実行すると会話中の顔グラの表示を変更することが可能です。
 * [FaceWidth] [FaceHeight] [offsetX] [offsetY]は省略可能
 *
 * ■プラグインコマンド
 *   FaceAnimetion set [FaceIndex] [EyeAnmCnt] [MouthAnmCnt] 　　　　　　　　　　　　　　　　　　　　　　　　　　 　           # 顔グラを設定します
 *   FaceAnimetion set [FaceIndex] [EyeAnmCnt] [MouthAnmCnt] [FaceWidth]                                 　           # 顔グラを設定します
 *   FaceAnimetion set [FaceIndex] [EyeAnmCnt] [MouthAnmCnt] [FaceWidth] [FaceHeight]                    　           # 顔グラを設定します
 *   FaceAnimetion set [FaceIndex] [EyeAnmCnt] [MouthAnmCnt] [FaceWidth] [FaceHeight] [OffsetX]          　           # 顔グラを設定します
 *   FaceAnimetion set [FaceIndex] [EyeAnmCnt] [MouthAnmCnt] [FaceWidth] [FaceHeight] [OffsetX] [OffsetY]　           # 顔グラを設定します
 *   FaceAnimetion set [FaceIndex] [EyeAnmCnt] [MouthAnmCnt] [FaceWidth] [FaceHeight] [OffsetX] [OffsetY]　[DispFace] # 顔グラを設定します
 *   FaceAnimetion clear                                                   　　　　　                         # 初期設定状態に戻します
 */

//name space
var fcanm = fcanm || (fcanm = {});

(function(fcanm){
  var FaceAnimetion = (function(){
    //constructor
    function FaceAnimetion(){
    this.initialize();
    };

    //member methods
    FaceAnimetion.prototype.initialize = function(){
      var parameters = PluginManager.parameters("FaceAnimetion");
      this.faceIndex = Number(parameters["FaceIndex"] || 0);
      this.eyeAnmCnt = Number(parameters["EyeAnmCnt"] || 0);
      this.mouthAnmCnt = Number(parameters["MouthAnmCnt"] || 0);
      this.faceWidth = Number(parameters["FaceWidth"] || Window_Base._faceWidth);
      this.faceHeight = Number(parameters["FaceHeight"] || Window_Base._faceHeight);
      this.offsetX = Number(parameters["OffsetX"] || this.standardPadding());
      this.offsetY = Number(parameters["OffsetY"] || 0);
      this.dispFace = Number(parameters["DispFace"] || 0);
    };

    FaceAnimetion.prototype.setParameter = function(args){
      //parse
      if(args.length < 4){
        this._tr("setParameter: args is invalid.");
        return false;
      }

      var parameters = PluginManager.parameters('FaceAnimetion');
      this.faceIndex = Number(args[1]);
      this.eyeAnmCnt = Number(args[2]);
      this.mouthAnmCnt = Number(args[3]);
      this.faceWidth = Number(args[4] || this.faceWidth);
      this.faceHeight = Number(args[5] || this.faceHeight);
      this.offsetX = Number(args[6] || this.offsetX);
      this.offsetY = Number(args[7] || this.offsetY);
      this.dispFace = Number(args[8] || this.dispFace);

      return true;
    };

      return FaceAnimetion;
    }
  )();

  FaceAnimetion.prototype.clearParameter = function(){
    this.initialize();
  };
  fcanm.FaceAnimetion = new FaceAnimetion();
}(fcanm || (fcanm = { }) ));

(function(){
  //-----------------------------------------------------------------------------
	// parse and dispatch plugin command
	//-----------------------------------------------------------------------------
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args){
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if(command === 'FaceAnimetion'){
			switch(args[0]){
				case 'set':
					fcanm.FaceAnimetion.setParameter(args);
					break;
				case 'clear':
					fcanm.FaceAnimetion.clearParameter();
					break;
					default:
				break;
			}
		}
	};


  var msgInit = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function(){
    msgInit.call(this);
    fcanm.FaceAnimetion.initialize();
    this._eyeAnimetionFlg = false;
    this._faceSprite = new Sprite_Base();
    this._eyeSprite = new Sprite_Base();
    this._eyeCnt = 0;
    this._mouthSprite = new Sprite_Base();
    this.addChild(this._faceSprite);
    this.addChild(this._eyeSprite);
    this.addChild(this._mouthSprite);
  }

  Window_Message.prototype.newLineX = function() {
      return (fcanm.FaceAnimetion.dispFace > 0 || $gameMessage.faceName() == "")  ? 0 : fcanm.FaceAnimetion.faceWidth;
  };

	Window_Message.prototype.drawMessageFace = function() {
	    this.drawFace($gameMessage.faceName(), fcanm.FaceAnimetion.faceIndex, 0, 0, fcanm.FaceAnimetion.faceWidth, fcanm.FaceAnimetion.faceHeight);
	};

	Window_Message.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    this._eyeCnt = 0;
    this.procCnt = 0;
    this.cnt = 0;
    this._eyeAnimetionFlg = false;
    this.eyeIndex = 0;
    this.mouthIndex = 1;
    if(faceName != ""){
      var bitmap = ImageManager.loadFace(faceName);
      width = (width > 0) ? width : Window_Base._faceWidth;
      height = (height > 0) ? height : Window_Base._faceHeight;
      var bitmap = ImageManager.loadFace(faceName);
      var sw = width;
      var sh = height;
      var dx = Math.floor(x);
      var dy = Math.floor(y);
      var sx = 0;
      var sy = Math.floor(faceIndex) * sh;
      // // EyeSprite
      var sx2 = sw;
      var sy2 = Math.floor(faceIndex) * sh;
      // // MouthSprite
      var sx3 = (fcanm.FaceAnimetion.eyeAnmCnt + 1) * sw;
      var sy3 = Math.floor(faceIndex) * sh;
      this._faceSprite.bitmap = bitmap;
      this._faceSprite.setFrame(sx, sy, sw, sh);
      this._faceSprite.x = 0 + fcanm.FaceAnimetion.offsetX;
      this._faceSprite.y = (Window_Base._faceHeight + this.lineHeight()/2) - height + fcanm.FaceAnimetion.offsetY;
      this._eyeSprite.bitmap = bitmap;
      this._eyeSprite.setFrame(sx2, sy2, sw, sh);
      this._eyeSprite.x = 0 + fcanm.FaceAnimetion.offsetX;
      this._eyeSprite.y = (Window_Base._faceHeight + this.lineHeight()/2) - height + fcanm.FaceAnimetion.offsetY;
      this._mouthSprite.bitmap = bitmap;
      this._mouthSprite.setFrame(sx3, sy3, sw, sh);
      this._mouthSprite.x = 0 + fcanm.FaceAnimetion.offsetX;
      this._mouthSprite.y = (Window_Base._faceHeight + this.lineHeight()/2) - height + fcanm.FaceAnimetion.offsetY;
    }
  }

	Window_Message.prototype.drawFaceEye = function(faceName, faceIndex, eyeIndex, x, y, width, height) {
    if(this._eyeSprite.bitmap != null){
      width = (width > 0) ? width : Window_Base._faceWidth;
      height = (height > 0) ? height : Window_Base._faceHeight;
      var sw = width;
      var sh = height;
      var dx = Math.floor(x);
      var dy = Math.floor(y);
      var sx = (eyeIndex + 1) * sw;
      var sy = Math.floor(faceIndex) * sh;
      this._eyeSprite.setFrame(sx, sy, sw, sh);
    }
	};

	Window_Message.prototype.drawFaceMouth = function(faceName, faceIndex, mouthIndex, x, y, width, height) {
    if(this._mouthSprite.bitmap != null){
      width = (width > 0) ? width : Window_Base._faceWidth;
	    height = (height > 0) ? height : Window_Base._faceHeight;
	    var sw = width;
	    var sh = height;
	    var dx = Math.floor(x);
	    var dy = Math.floor(y);
	    var sx = (fcanm.FaceAnimetion.eyeAnmCnt + mouthIndex + 1) * sw;
	    var sy = Math.floor(faceIndex) * sh;
      this._mouthSprite.setFrame(sx, sy, sw, sh);
    }
	};

  var msgUpd = Window_Message.prototype.update;
  Window_Message.prototype.update = function() {
    this.cnt = this.cnt + 1;
    if(!this._eyeAnimetionFlg && Math.floor(Math.random() * (120 - 1 + 1) + 1) == 3){
      this._eyeAnimetionFlg = true;
    }
    if(this._eyeAnimetionFlg && this.cnt%10 == 0){
      if(this._eyeSprite.bitmap != null){
        this.eyeIndex = this.eyeIndex % fcanm.FaceAnimetion.eyeAnmCnt;
        this.drawFaceEye($gameMessage.faceName(), fcanm.FaceAnimetion.faceIndex, this.eyeIndex, this._faceSprite.x, this._faceSprite.y, this._faceSprite.width, this._faceSprite.height);
        this.eyeIndex = this.eyeIndex + 1;
        this._eyeCnt = this._eyeCnt + 1;
        if(this._eyeCnt == fcanm.FaceAnimetion.eyeAnmCnt + 1){
          this._eyeAnimetionFlg = false;
          this._eyeCnt = 0;
          this.eyeIndex = 0;
        }
      }
    }
    msgUpd.call(this);
  };

  var msgProcChara = Window_Message.prototype.processCharacter
  Window_Message.prototype.processCharacter = function(textState){
    msgProcChara.call(this, this._textState);
    this.procCnt = this.procCnt + 1;
    if(this.procCnt%5 == 0){
      if(this._mouthSprite.bitmap != null){
        this.mouthIndex = (this.mouthIndex + 1) % fcanm.FaceAnimetion.mouthAnmCnt;
        this.drawFaceMouth($gameMessage.faceName(), fcanm.FaceAnimetion.faceIndex, this.mouthIndex, this._faceSprite.x, this._faceSprite.y, this._faceSprite.width, this._faceSprite.height);
      }
    }
  };

  var msgClose = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function() {
    this._faceSprite.bitmap = null;
    this._mouthSprite.bitmap = null;
    this._eyeSprite.bitmap = null;
    msgClose.call(this);
  };

})();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQkFBc0I7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ob21lcGFnZS8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRmFjZUFuaW1ldGlvbi5qc1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKjpqYVxuICogdjAuMS4wXG4gKiBAcGx1Z2luZGVzY1xuICog6aGU44Kw44Op44Gu44Ki44OL44Oh44O844K344On44Oz44KS6KGM44GGXG4gKlxuICogQGF1dGhvciDjgqrjgqrjg5vjgr/jg6vjgrXjgqTjgrNcbiAqXG4gKiBAcGFyYW0gRmFjZUluZGV4XG4gKiBAZGVmYXVsdCAwXG4gKiBAZGVzYyDooajnpLrjgZnjgovpoZTjgrDjg6njga7jgqTjg7Pjg4fjg4Pjgq/jgrnnlarlj7dcbiAqXG4gKiBAcGFyYW0gRXllQW5tQ250XG4gKiBAZGVmYXVsdCA0XG4gKiBAZGVzYyDnm67jga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7PmlbBcbiAqXG4gKiBAcGFyYW0gTW91dGhBbm1DbnRcbiAqIEBkZWZhdWx0IDJcbiAqIEBkZXNjIOWPo+OBruOCouODi+ODoeODvOOCt+ODp+ODs+aVsFxuICpcbiAqIEBwYXJhbSBGYWNlV2lkdGhcbiAqIEBkZWZhdWx0IDE0NFxuICogQGRlc2Mg6aGU44Kw44Op44Gu5qiq5bmFXG4gKlxuICogQHBhcmFtIEZhY2VIZWlnaHRcbiAqIEBkZWZhdWx0IDE0NFxuICogQGRlc2Mg6aGU44Kw44Op44Gu57im5bmFXG4gKlxuICogQHBhcmFtIE9mZnNldFhcbiAqIEBkZWZhdWx0IDE4XG4gKiBAZGVzYyDpoZTjgrDjg6njga7oqr/mlbRY5bqn5qiZXG4gKlxuICogQHBhcmFtIE9mZnNldFlcbiAqIEBkZWZhdWx0IDBcbiAqIEBkZXNjIOmhlOOCsOODqeOBruiqv+aVtFnluqfmqJlcbiAqXG4gKiBAcGFyYW0gRGlzcEZhY2VcbiAqIEBkZWZhdWx0IDBcbiAqIEBkZXNjIOmhlOOCsOODqeOBruihqOekuuWgtOaJgFxuICpcbiAqIEBoZWxwXG4gKiDilqDmpoLopoFcbiAqIEZhY2VBbmltZXRpb27jg5fjg6njgrDjgqTjg7PjgpLliKnnlKjjgZnjgovjgavjga/jg5fjg6njgrDjgqTjg7PjgrPjg57jg7Pjg4njgYvjgonlrp/ooYzjgZfjgb7jgZnjgIJcbiAqIOODl+ODqeOCsOOCpOODs+OCs+ODnuODs+ODieOCkuWun+ihjOOBmeOCi+OBqOS8muipseS4reOBrumhlOOCsOODqeOBruihqOekuuOCkuWkieabtOOBmeOCi+OBk+OBqOOBjOWPr+iDveOBp+OBmeOAglxuICogW0ZhY2VXaWR0aF0gW0ZhY2VIZWlnaHRdIFtvZmZzZXRYXSBbb2Zmc2V0WV3jga/nnIHnlaXlj6/og71cbiAqXG4gKiDilqDjg5fjg6njgrDjgqTjg7PjgrPjg57jg7Pjg4lcbiAqICAgRmFjZUFuaW1ldGlvbiBzZXQgW0ZhY2VJbmRleF0gW0V5ZUFubUNudF0gW01vdXRoQW5tQ250XSDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIAg44CAICAgICAgICAgICAjIOmhlOOCsOODqeOCkuioreWumuOBl+OBvuOBmVxuICogICBGYWNlQW5pbWV0aW9uIHNldCBbRmFjZUluZGV4XSBbRXllQW5tQ250XSBbTW91dGhBbm1DbnRdIFtGYWNlV2lkdGhdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg44CAICAgICAgICAgICAjIOmhlOOCsOODqeOCkuioreWumuOBl+OBvuOBmVxuICogICBGYWNlQW5pbWV0aW9uIHNldCBbRmFjZUluZGV4XSBbRXllQW5tQ250XSBbTW91dGhBbm1DbnRdIFtGYWNlV2lkdGhdIFtGYWNlSGVpZ2h0XSAgICAgICAgICAgICAgICAgICAg44CAICAgICAgICAgICAjIOmhlOOCsOODqeOCkuioreWumuOBl+OBvuOBmVxuICogICBGYWNlQW5pbWV0aW9uIHNldCBbRmFjZUluZGV4XSBbRXllQW5tQ250XSBbTW91dGhBbm1DbnRdIFtGYWNlV2lkdGhdIFtGYWNlSGVpZ2h0XSBbT2Zmc2V0WF0gICAgICAgICAg44CAICAgICAgICAgICAjIOmhlOOCsOODqeOCkuioreWumuOBl+OBvuOBmVxuICogICBGYWNlQW5pbWV0aW9uIHNldCBbRmFjZUluZGV4XSBbRXllQW5tQ250XSBbTW91dGhBbm1DbnRdIFtGYWNlV2lkdGhdIFtGYWNlSGVpZ2h0XSBbT2Zmc2V0WF0gW09mZnNldFld44CAICAgICAgICAgICAjIOmhlOOCsOODqeOCkuioreWumuOBl+OBvuOBmVxuICogICBGYWNlQW5pbWV0aW9uIHNldCBbRmFjZUluZGV4XSBbRXllQW5tQ250XSBbTW91dGhBbm1DbnRdIFtGYWNlV2lkdGhdIFtGYWNlSGVpZ2h0XSBbT2Zmc2V0WF0gW09mZnNldFld44CAW0Rpc3BGYWNlXSAjIOmhlOOCsOODqeOCkuioreWumuOBl+OBvuOBmVxuICogICBGYWNlQW5pbWV0aW9uIGNsZWFyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg44CA44CA44CA44CA44CAICAgICAgICAgICAgICAgICAgICAgICAgICMg5Yid5pyf6Kit5a6a54q25oWL44Gr5oi744GX44G+44GZXG4gKi9cblxuLy9uYW1lIHNwYWNlXG52YXIgZmNhbm0gPSBmY2FubSB8fCAoZmNhbm0gPSB7fSk7XG5cbihmdW5jdGlvbihmY2FubSl7XG4gIHZhciBGYWNlQW5pbWV0aW9uID0gKGZ1bmN0aW9uKCl7XG4gICAgLy9jb25zdHJ1Y3RvclxuICAgIGZ1bmN0aW9uIEZhY2VBbmltZXRpb24oKXtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9O1xuXG4gICAgLy9tZW1iZXIgbWV0aG9kc1xuICAgIEZhY2VBbmltZXRpb24ucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbigpe1xuICAgICAgdmFyIHBhcmFtZXRlcnMgPSBQbHVnaW5NYW5hZ2VyLnBhcmFtZXRlcnMoXCJGYWNlQW5pbWV0aW9uXCIpO1xuICAgICAgdGhpcy5mYWNlSW5kZXggPSBOdW1iZXIocGFyYW1ldGVyc1tcIkZhY2VJbmRleFwiXSB8fCAwKTtcbiAgICAgIHRoaXMuZXllQW5tQ250ID0gTnVtYmVyKHBhcmFtZXRlcnNbXCJFeWVBbm1DbnRcIl0gfHwgMCk7XG4gICAgICB0aGlzLm1vdXRoQW5tQ250ID0gTnVtYmVyKHBhcmFtZXRlcnNbXCJNb3V0aEFubUNudFwiXSB8fCAwKTtcbiAgICAgIHRoaXMuZmFjZVdpZHRoID0gTnVtYmVyKHBhcmFtZXRlcnNbXCJGYWNlV2lkdGhcIl0gfHwgV2luZG93X0Jhc2UuX2ZhY2VXaWR0aCk7XG4gICAgICB0aGlzLmZhY2VIZWlnaHQgPSBOdW1iZXIocGFyYW1ldGVyc1tcIkZhY2VIZWlnaHRcIl0gfHwgV2luZG93X0Jhc2UuX2ZhY2VIZWlnaHQpO1xuICAgICAgdGhpcy5vZmZzZXRYID0gTnVtYmVyKHBhcmFtZXRlcnNbXCJPZmZzZXRYXCJdIHx8IHRoaXMuc3RhbmRhcmRQYWRkaW5nKCkpO1xuICAgICAgdGhpcy5vZmZzZXRZID0gTnVtYmVyKHBhcmFtZXRlcnNbXCJPZmZzZXRZXCJdIHx8IDApO1xuICAgICAgdGhpcy5kaXNwRmFjZSA9IE51bWJlcihwYXJhbWV0ZXJzW1wiRGlzcEZhY2VcIl0gfHwgMCk7XG4gICAgfTtcblxuICAgIEZhY2VBbmltZXRpb24ucHJvdG90eXBlLnNldFBhcmFtZXRlciA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICAgICAgLy9wYXJzZVxuICAgICAgaWYoYXJncy5sZW5ndGggPCA0KXtcbiAgICAgICAgdGhpcy5fdHIoXCJzZXRQYXJhbWV0ZXI6IGFyZ3MgaXMgaW52YWxpZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmFtZXRlcnMgPSBQbHVnaW5NYW5hZ2VyLnBhcmFtZXRlcnMoJ0ZhY2VBbmltZXRpb24nKTtcbiAgICAgIHRoaXMuZmFjZUluZGV4ID0gTnVtYmVyKGFyZ3NbMV0pO1xuICAgICAgdGhpcy5leWVBbm1DbnQgPSBOdW1iZXIoYXJnc1syXSk7XG4gICAgICB0aGlzLm1vdXRoQW5tQ250ID0gTnVtYmVyKGFyZ3NbM10pO1xuICAgICAgdGhpcy5mYWNlV2lkdGggPSBOdW1iZXIoYXJnc1s0XSB8fCB0aGlzLmZhY2VXaWR0aCk7XG4gICAgICB0aGlzLmZhY2VIZWlnaHQgPSBOdW1iZXIoYXJnc1s1XSB8fCB0aGlzLmZhY2VIZWlnaHQpO1xuICAgICAgdGhpcy5vZmZzZXRYID0gTnVtYmVyKGFyZ3NbNl0gfHwgdGhpcy5vZmZzZXRYKTtcbiAgICAgIHRoaXMub2Zmc2V0WSA9IE51bWJlcihhcmdzWzddIHx8IHRoaXMub2Zmc2V0WSk7XG4gICAgICB0aGlzLmRpc3BGYWNlID0gTnVtYmVyKGFyZ3NbOF0gfHwgdGhpcy5kaXNwRmFjZSk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAgIHJldHVybiBGYWNlQW5pbWV0aW9uO1xuICAgIH1cbiAgKSgpO1xuXG4gIEZhY2VBbmltZXRpb24ucHJvdG90eXBlLmNsZWFyUGFyYW1ldGVyID0gZnVuY3Rpb24oKXtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfTtcbiAgZmNhbm0uRmFjZUFuaW1ldGlvbiA9IG5ldyBGYWNlQW5pbWV0aW9uKCk7XG59KGZjYW5tIHx8IChmY2FubSA9IHsgfSkgKSk7XG5cbihmdW5jdGlvbigpe1xuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIHBhcnNlIGFuZCBkaXNwYXRjaCBwbHVnaW4gY29tbWFuZFxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHZhciBfR2FtZV9JbnRlcnByZXRlcl9wbHVnaW5Db21tYW5kID0gR2FtZV9JbnRlcnByZXRlci5wcm90b3R5cGUucGx1Z2luQ29tbWFuZDtcblx0R2FtZV9JbnRlcnByZXRlci5wcm90b3R5cGUucGx1Z2luQ29tbWFuZCA9IGZ1bmN0aW9uKGNvbW1hbmQsIGFyZ3Mpe1xuXHRcdF9HYW1lX0ludGVycHJldGVyX3BsdWdpbkNvbW1hbmQuY2FsbCh0aGlzLCBjb21tYW5kLCBhcmdzKTtcblx0XHRpZihjb21tYW5kID09PSAnRmFjZUFuaW1ldGlvbicpe1xuXHRcdFx0c3dpdGNoKGFyZ3NbMF0pe1xuXHRcdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0XHRcdGZjYW5tLkZhY2VBbmltZXRpb24uc2V0UGFyYW1ldGVyKGFyZ3MpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdjbGVhcic6XG5cdFx0XHRcdFx0ZmNhbm0uRmFjZUFuaW1ldGlvbi5jbGVhclBhcmFtZXRlcigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXG4gIHZhciBtc2dJbml0ID0gV2luZG93X01lc3NhZ2UucHJvdG90eXBlLmluaXRpYWxpemU7XG4gIFdpbmRvd19NZXNzYWdlLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24oKXtcbiAgICBtc2dJbml0LmNhbGwodGhpcyk7XG4gICAgZmNhbm0uRmFjZUFuaW1ldGlvbi5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5fZXllQW5pbWV0aW9uRmxnID0gZmFsc2U7XG4gICAgdGhpcy5fZmFjZVNwcml0ZSA9IG5ldyBTcHJpdGVfQmFzZSgpO1xuICAgIHRoaXMuX2V5ZVNwcml0ZSA9IG5ldyBTcHJpdGVfQmFzZSgpO1xuICAgIHRoaXMuX2V5ZUNudCA9IDA7XG4gICAgdGhpcy5fbW91dGhTcHJpdGUgPSBuZXcgU3ByaXRlX0Jhc2UoKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2ZhY2VTcHJpdGUpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fZXllU3ByaXRlKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuX21vdXRoU3ByaXRlKTtcbiAgfVxuXG4gIFdpbmRvd19NZXNzYWdlLnByb3RvdHlwZS5uZXdMaW5lWCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChmY2FubS5GYWNlQW5pbWV0aW9uLmRpc3BGYWNlID4gMCB8fCAkZ2FtZU1lc3NhZ2UuZmFjZU5hbWUoKSA9PSBcIlwiKSAgPyAwIDogZmNhbm0uRmFjZUFuaW1ldGlvbi5mYWNlV2lkdGg7XG4gIH07XG5cblx0V2luZG93X01lc3NhZ2UucHJvdG90eXBlLmRyYXdNZXNzYWdlRmFjZSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgdGhpcy5kcmF3RmFjZSgkZ2FtZU1lc3NhZ2UuZmFjZU5hbWUoKSwgZmNhbm0uRmFjZUFuaW1ldGlvbi5mYWNlSW5kZXgsIDAsIDAsIGZjYW5tLkZhY2VBbmltZXRpb24uZmFjZVdpZHRoLCBmY2FubS5GYWNlQW5pbWV0aW9uLmZhY2VIZWlnaHQpO1xuXHR9O1xuXG5cdFdpbmRvd19NZXNzYWdlLnByb3RvdHlwZS5kcmF3RmFjZSA9IGZ1bmN0aW9uKGZhY2VOYW1lLCBmYWNlSW5kZXgsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLl9leWVDbnQgPSAwO1xuICAgIHRoaXMucHJvY0NudCA9IDA7XG4gICAgdGhpcy5jbnQgPSAwO1xuICAgIHRoaXMuX2V5ZUFuaW1ldGlvbkZsZyA9IGZhbHNlO1xuICAgIHRoaXMuZXllSW5kZXggPSAwO1xuICAgIHRoaXMubW91dGhJbmRleCA9IDE7XG4gICAgaWYoZmFjZU5hbWUgIT0gXCJcIil7XG4gICAgICB2YXIgYml0bWFwID0gSW1hZ2VNYW5hZ2VyLmxvYWRGYWNlKGZhY2VOYW1lKTtcbiAgICAgIHdpZHRoID0gKHdpZHRoID4gMCkgPyB3aWR0aCA6IFdpbmRvd19CYXNlLl9mYWNlV2lkdGg7XG4gICAgICBoZWlnaHQgPSAoaGVpZ2h0ID4gMCkgPyBoZWlnaHQgOiBXaW5kb3dfQmFzZS5fZmFjZUhlaWdodDtcbiAgICAgIHZhciBiaXRtYXAgPSBJbWFnZU1hbmFnZXIubG9hZEZhY2UoZmFjZU5hbWUpO1xuICAgICAgdmFyIHN3ID0gd2lkdGg7XG4gICAgICB2YXIgc2ggPSBoZWlnaHQ7XG4gICAgICB2YXIgZHggPSBNYXRoLmZsb29yKHgpO1xuICAgICAgdmFyIGR5ID0gTWF0aC5mbG9vcih5KTtcbiAgICAgIHZhciBzeCA9IDA7XG4gICAgICB2YXIgc3kgPSBNYXRoLmZsb29yKGZhY2VJbmRleCkgKiBzaDtcbiAgICAgIC8vIC8vIEV5ZVNwcml0ZVxuICAgICAgdmFyIHN4MiA9IHN3O1xuICAgICAgdmFyIHN5MiA9IE1hdGguZmxvb3IoZmFjZUluZGV4KSAqIHNoO1xuICAgICAgLy8gLy8gTW91dGhTcHJpdGVcbiAgICAgIHZhciBzeDMgPSAoZmNhbm0uRmFjZUFuaW1ldGlvbi5leWVBbm1DbnQgKyAxKSAqIHN3O1xuICAgICAgdmFyIHN5MyA9IE1hdGguZmxvb3IoZmFjZUluZGV4KSAqIHNoO1xuICAgICAgdGhpcy5fZmFjZVNwcml0ZS5iaXRtYXAgPSBiaXRtYXA7XG4gICAgICB0aGlzLl9mYWNlU3ByaXRlLnNldEZyYW1lKHN4LCBzeSwgc3csIHNoKTtcbiAgICAgIHRoaXMuX2ZhY2VTcHJpdGUueCA9IDAgKyBmY2FubS5GYWNlQW5pbWV0aW9uLm9mZnNldFg7XG4gICAgICB0aGlzLl9mYWNlU3ByaXRlLnkgPSAoV2luZG93X0Jhc2UuX2ZhY2VIZWlnaHQgKyB0aGlzLmxpbmVIZWlnaHQoKS8yKSAtIGhlaWdodCArIGZjYW5tLkZhY2VBbmltZXRpb24ub2Zmc2V0WTtcbiAgICAgIHRoaXMuX2V5ZVNwcml0ZS5iaXRtYXAgPSBiaXRtYXA7XG4gICAgICB0aGlzLl9leWVTcHJpdGUuc2V0RnJhbWUoc3gyLCBzeTIsIHN3LCBzaCk7XG4gICAgICB0aGlzLl9leWVTcHJpdGUueCA9IDAgKyBmY2FubS5GYWNlQW5pbWV0aW9uLm9mZnNldFg7XG4gICAgICB0aGlzLl9leWVTcHJpdGUueSA9IChXaW5kb3dfQmFzZS5fZmFjZUhlaWdodCArIHRoaXMubGluZUhlaWdodCgpLzIpIC0gaGVpZ2h0ICsgZmNhbm0uRmFjZUFuaW1ldGlvbi5vZmZzZXRZO1xuICAgICAgdGhpcy5fbW91dGhTcHJpdGUuYml0bWFwID0gYml0bWFwO1xuICAgICAgdGhpcy5fbW91dGhTcHJpdGUuc2V0RnJhbWUoc3gzLCBzeTMsIHN3LCBzaCk7XG4gICAgICB0aGlzLl9tb3V0aFNwcml0ZS54ID0gMCArIGZjYW5tLkZhY2VBbmltZXRpb24ub2Zmc2V0WDtcbiAgICAgIHRoaXMuX21vdXRoU3ByaXRlLnkgPSAoV2luZG93X0Jhc2UuX2ZhY2VIZWlnaHQgKyB0aGlzLmxpbmVIZWlnaHQoKS8yKSAtIGhlaWdodCArIGZjYW5tLkZhY2VBbmltZXRpb24ub2Zmc2V0WTtcbiAgICB9XG4gIH1cblxuXHRXaW5kb3dfTWVzc2FnZS5wcm90b3R5cGUuZHJhd0ZhY2VFeWUgPSBmdW5jdGlvbihmYWNlTmFtZSwgZmFjZUluZGV4LCBleWVJbmRleCwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGlmKHRoaXMuX2V5ZVNwcml0ZS5iaXRtYXAgIT0gbnVsbCl7XG4gICAgICB3aWR0aCA9ICh3aWR0aCA+IDApID8gd2lkdGggOiBXaW5kb3dfQmFzZS5fZmFjZVdpZHRoO1xuICAgICAgaGVpZ2h0ID0gKGhlaWdodCA+IDApID8gaGVpZ2h0IDogV2luZG93X0Jhc2UuX2ZhY2VIZWlnaHQ7XG4gICAgICB2YXIgc3cgPSB3aWR0aDtcbiAgICAgIHZhciBzaCA9IGhlaWdodDtcbiAgICAgIHZhciBkeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgICB2YXIgZHkgPSBNYXRoLmZsb29yKHkpO1xuICAgICAgdmFyIHN4ID0gKGV5ZUluZGV4ICsgMSkgKiBzdztcbiAgICAgIHZhciBzeSA9IE1hdGguZmxvb3IoZmFjZUluZGV4KSAqIHNoO1xuICAgICAgdGhpcy5fZXllU3ByaXRlLnNldEZyYW1lKHN4LCBzeSwgc3csIHNoKTtcbiAgICB9XG5cdH07XG5cblx0V2luZG93X01lc3NhZ2UucHJvdG90eXBlLmRyYXdGYWNlTW91dGggPSBmdW5jdGlvbihmYWNlTmFtZSwgZmFjZUluZGV4LCBtb3V0aEluZGV4LCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYodGhpcy5fbW91dGhTcHJpdGUuYml0bWFwICE9IG51bGwpe1xuICAgICAgd2lkdGggPSAod2lkdGggPiAwKSA/IHdpZHRoIDogV2luZG93X0Jhc2UuX2ZhY2VXaWR0aDtcblx0ICAgIGhlaWdodCA9IChoZWlnaHQgPiAwKSA/IGhlaWdodCA6IFdpbmRvd19CYXNlLl9mYWNlSGVpZ2h0O1xuXHQgICAgdmFyIHN3ID0gd2lkdGg7XG5cdCAgICB2YXIgc2ggPSBoZWlnaHQ7XG5cdCAgICB2YXIgZHggPSBNYXRoLmZsb29yKHgpO1xuXHQgICAgdmFyIGR5ID0gTWF0aC5mbG9vcih5KTtcblx0ICAgIHZhciBzeCA9IChmY2FubS5GYWNlQW5pbWV0aW9uLmV5ZUFubUNudCArIG1vdXRoSW5kZXggKyAxKSAqIHN3O1xuXHQgICAgdmFyIHN5ID0gTWF0aC5mbG9vcihmYWNlSW5kZXgpICogc2g7XG4gICAgICB0aGlzLl9tb3V0aFNwcml0ZS5zZXRGcmFtZShzeCwgc3ksIHN3LCBzaCk7XG4gICAgfVxuXHR9O1xuXG4gIHZhciBtc2dVcGQgPSBXaW5kb3dfTWVzc2FnZS5wcm90b3R5cGUudXBkYXRlO1xuICBXaW5kb3dfTWVzc2FnZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jbnQgPSB0aGlzLmNudCArIDE7XG4gICAgaWYoIXRoaXMuX2V5ZUFuaW1ldGlvbkZsZyAmJiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTIwIC0gMSArIDEpICsgMSkgPT0gMyl7XG4gICAgICB0aGlzLl9leWVBbmltZXRpb25GbGcgPSB0cnVlO1xuICAgIH1cbiAgICBpZih0aGlzLl9leWVBbmltZXRpb25GbGcgJiYgdGhpcy5jbnQlMTAgPT0gMCl7XG4gICAgICBpZih0aGlzLl9leWVTcHJpdGUuYml0bWFwICE9IG51bGwpe1xuICAgICAgICB0aGlzLmV5ZUluZGV4ID0gdGhpcy5leWVJbmRleCAlIGZjYW5tLkZhY2VBbmltZXRpb24uZXllQW5tQ250O1xuICAgICAgICB0aGlzLmRyYXdGYWNlRXllKCRnYW1lTWVzc2FnZS5mYWNlTmFtZSgpLCBmY2FubS5GYWNlQW5pbWV0aW9uLmZhY2VJbmRleCwgdGhpcy5leWVJbmRleCwgdGhpcy5fZmFjZVNwcml0ZS54LCB0aGlzLl9mYWNlU3ByaXRlLnksIHRoaXMuX2ZhY2VTcHJpdGUud2lkdGgsIHRoaXMuX2ZhY2VTcHJpdGUuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5leWVJbmRleCA9IHRoaXMuZXllSW5kZXggKyAxO1xuICAgICAgICB0aGlzLl9leWVDbnQgPSB0aGlzLl9leWVDbnQgKyAxO1xuICAgICAgICBpZih0aGlzLl9leWVDbnQgPT0gZmNhbm0uRmFjZUFuaW1ldGlvbi5leWVBbm1DbnQgKyAxKXtcbiAgICAgICAgICB0aGlzLl9leWVBbmltZXRpb25GbGcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLl9leWVDbnQgPSAwO1xuICAgICAgICAgIHRoaXMuZXllSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG1zZ1VwZC5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIHZhciBtc2dQcm9jQ2hhcmEgPSBXaW5kb3dfTWVzc2FnZS5wcm90b3R5cGUucHJvY2Vzc0NoYXJhY3RlclxuICBXaW5kb3dfTWVzc2FnZS5wcm90b3R5cGUucHJvY2Vzc0NoYXJhY3RlciA9IGZ1bmN0aW9uKHRleHRTdGF0ZSl7XG4gICAgbXNnUHJvY0NoYXJhLmNhbGwodGhpcywgdGhpcy5fdGV4dFN0YXRlKTtcbiAgICB0aGlzLnByb2NDbnQgPSB0aGlzLnByb2NDbnQgKyAxO1xuICAgIGlmKHRoaXMucHJvY0NudCU1ID09IDApe1xuICAgICAgaWYodGhpcy5fbW91dGhTcHJpdGUuYml0bWFwICE9IG51bGwpe1xuICAgICAgICB0aGlzLm1vdXRoSW5kZXggPSAodGhpcy5tb3V0aEluZGV4ICsgMSkgJSBmY2FubS5GYWNlQW5pbWV0aW9uLm1vdXRoQW5tQ250O1xuICAgICAgICB0aGlzLmRyYXdGYWNlTW91dGgoJGdhbWVNZXNzYWdlLmZhY2VOYW1lKCksIGZjYW5tLkZhY2VBbmltZXRpb24uZmFjZUluZGV4LCB0aGlzLm1vdXRoSW5kZXgsIHRoaXMuX2ZhY2VTcHJpdGUueCwgdGhpcy5fZmFjZVNwcml0ZS55LCB0aGlzLl9mYWNlU3ByaXRlLndpZHRoLCB0aGlzLl9mYWNlU3ByaXRlLmhlaWdodCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBtc2dDbG9zZSA9IFdpbmRvd19NZXNzYWdlLnByb3RvdHlwZS50ZXJtaW5hdGVNZXNzYWdlO1xuICBXaW5kb3dfTWVzc2FnZS5wcm90b3R5cGUudGVybWluYXRlTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2ZhY2VTcHJpdGUuYml0bWFwID0gbnVsbDtcbiAgICB0aGlzLl9tb3V0aFNwcml0ZS5iaXRtYXAgPSBudWxsO1xuICAgIHRoaXMuX2V5ZVNwcml0ZS5iaXRtYXAgPSBudWxsO1xuICAgIG1zZ0Nsb3NlLmNhbGwodGhpcyk7XG4gIH07XG5cbn0pKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9