/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(null, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/common/locales/ca-ES-VALENCIA", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
        if (i === 1 && v === 0)
            return 1;
        return 5;
    }
    exports.default = [
        'ca-ES-VALENCIA', [['a. m.', 'p. m.'], u, u], u,
        [
            ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'], ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.'],
            ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
            ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.']
        ],
        u,
        [
            ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],
            [
                'de gen.', 'de febr.', 'de març', 'd’abr.', 'de maig', 'de juny', 'de jul.', 'd’ag.',
                'de set.', 'd’oct.', 'de nov.', 'de des.'
            ],
            [
                'de gener', 'de febrer', 'de març', 'd’abril', 'de maig', 'de juny', 'de juliol',
                'd’agost', 'de setembre', 'd’octubre', 'de novembre', 'de desembre'
            ]
        ],
        [
            ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],
            [
                'gen.', 'febr.', 'març', 'abr.', 'maig', 'juny', 'jul.', 'ag.', 'set.', 'oct.', 'nov.',
                'des.'
            ],
            [
                'gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre',
                'novembre', 'desembre'
            ]
        ],
        [['aC', 'dC'], u, ['abans de Crist', 'després de Crist']], 1, [6, 0],
        ['d/M/yy', 'd MMM y', 'd MMMM \'de\' y', 'EEEE, d MMMM \'de\' y'],
        ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
        ['{1} {0}', '{1}, {0}', '{1} \'a\' \'les\' {0}', u],
        [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '€', 'euro', {
            'AUD': ['AU$', '$'],
            'BRL': [u, 'R$'],
            'CAD': [u, '$'],
            'CNY': ['¥'],
            'ESP': ['₧'],
            'JPY': ['JP¥', '¥'],
            'MXN': [u, '$'],
            'THB': ['฿'],
            'USD': [u, '$'],
            'VEF': [],
            'XCD': [u, '$']
        },
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2EtRVMtVkFMRU5DSUEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9jYS1FUy1WQUxFTkNJQS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFlO1FBQ2IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvQztZQUNFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDN0YsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUM7WUFDakYsQ0FBQyxLQUFLLEVBQUUsS0FB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LCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRISVMgQ09ERSBJUyBHRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG4vLyBTZWUgYW5ndWxhci90b29scy9ndWxwLXRhc2tzL2NsZHIvZXh0cmFjdC5qc1xuXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwbHVyYWwobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IGkgPSBNYXRoLmZsb29yKE1hdGguYWJzKG4pKSwgdiA9IG4udG9TdHJpbmcoKS5yZXBsYWNlKC9eW14uXSpcXC4/LywgJycpLmxlbmd0aDtcbiAgaWYgKGkgPT09IDEgJiYgdiA9PT0gMCkgcmV0dXJuIDE7XG4gIHJldHVybiA1O1xufVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gICdjYS1FUy1WQUxFTkNJQScsIFtbJ2EuIG0uJywgJ3AuIG0uJ10sIHUsIHVdLCB1LFxuICBbXG4gICAgWydkZycsICdkbCcsICdkdCcsICdkYycsICdkaicsICdkdicsICdkcyddLCBbJ2RnLicsICdkbC4nLCAnZHQuJywgJ2RjLicsICdkai4nLCAnZHYuJywgJ2RzLiddLFxuICAgIFsnZGl1bWVuZ2UnLCAnZGlsbHVucycsICdkaW1hcnRzJywgJ2RpbWVjcmVzJywgJ2Rpam91cycsICdkaXZlbmRyZXMnLCAnZGlzc2FidGUnXSxcbiAgICBbJ2RnLicsICdkbC4nLCAnZHQuJywgJ2RjLicsICdkai4nLCAnZHYuJywgJ2RzLiddXG4gIF0sXG4gIHUsXG4gIFtcbiAgICBbJ0dOJywgJ0ZCJywgJ03DhycsICdBQicsICdNRycsICdKTicsICdKTCcsICdBRycsICdTVCcsICdPQycsICdOVicsICdEUyddLFxuICAgIFtcbiAgICAgICdkZSBnZW4uJywgJ2RlIGZlYnIuJywgJ2RlIG1hcsOnJywgJ2TigJlhYnIuJywgJ2RlIG1haWcnLCAnZGUganVueScsICdkZSBqdWwuJywgJ2TigJlhZy4nLFxuICAgICAgJ2RlIHNldC4nLCAnZOKAmW9jdC4nLCAnZGUgbm92LicsICdkZSBkZXMuJ1xuICAgIF0sXG4gICAgW1xuICAgICAgJ2RlIGdlbmVyJywgJ2RlIGZlYnJlcicsICdkZSBtYXLDpycsICdk4oCZYWJyaWwnLCAnZGUgbWFpZycsICdkZSBqdW55JywgJ2RlIGp1bGlvbCcsXG4gICAgICAnZOKAmWFnb3N0JywgJ2RlIHNldGVtYnJlJywgJ2TigJlvY3R1YnJlJywgJ2RlIG5vdmVtYnJlJywgJ2RlIGRlc2VtYnJlJ1xuICAgIF1cbiAgXSxcbiAgW1xuICAgIFsnR04nLCAnRkInLCAnTcOHJywgJ0FCJywgJ01HJywgJ0pOJywgJ0pMJywgJ0FHJywgJ1NUJywgJ09DJywgJ05WJywgJ0RTJ10sXG4gICAgW1xuICAgICAgJ2dlbi4nLCAnZmVici4nLCAnbWFyw6cnLCAnYWJyLicsICdtYWlnJywgJ2p1bnknLCAnanVsLicsICdhZy4nLCAnc2V0LicsICdvY3QuJywgJ25vdi4nLFxuICAgICAgJ2Rlcy4nXG4gICAgXSxcbiAgICBbXG4gICAgICAnZ2VuZXInLCAnZmVicmVyJywgJ21hcsOnJywgJ2FicmlsJywgJ21haWcnLCAnanVueScsICdqdWxpb2wnLCAnYWdvc3QnLCAnc2V0ZW1icmUnLCAnb2N0dWJyZScsXG4gICAgICAnbm92ZW1icmUnLCAnZGVzZW1icmUnXG4gICAgXVxuICBdLFxuICBbWydhQycsICdkQyddLCB1LCBbJ2FiYW5zIGRlIENyaXN0JywgJ2Rlc3Byw6lzIGRlIENyaXN0J11dLCAxLCBbNiwgMF0sXG4gIFsnZC9NL3l5JywgJ2QgTU1NIHknLCAnZCBNTU1NIFxcJ2RlXFwnIHknLCAnRUVFRSwgZCBNTU1NIFxcJ2RlXFwnIHknXSxcbiAgWydIOm1tJywgJ0g6bW06c3MnLCAnSDptbTpzcyB6JywgJ0g6bW06c3Mgenp6eiddLFxuICBbJ3sxfSB7MH0nLCAnezF9LCB7MH0nLCAnezF9IFxcJ2FcXCcgXFwnbGVzXFwnIHswfScsIHVdLFxuICBbJywnLCAnLicsICc7JywgJyUnLCAnKycsICctJywgJ0UnLCAnw5cnLCAn4oCwJywgJ+KInicsICdOYU4nLCAnOiddLFxuICBbJyMsIyMwLiMjIycsICcjLCMjMCUnLCAnIywjIzAuMDDCoMKkJywgJyNFMCddLCAn4oKsJywgJ2V1cm8nLCB7XG4gICAgJ0FVRCc6IFsnQVUkJywgJyQnXSxcbiAgICAnQlJMJzogW3UsICdSJCddLFxuICAgICdDQUQnOiBbdSwgJyQnXSxcbiAgICAnQ05ZJzogWyfCpSddLFxuICAgICdFU1AnOiBbJ+KCpyddLFxuICAgICdKUFknOiBbJ0pQwqUnLCAnwqUnXSxcbiAgICAnTVhOJzogW3UsICckJ10sXG4gICAgJ1RIQic6IFsn4Li/J10sXG4gICAgJ1VTRCc6IFt1LCAnJCddLFxuICAgICdWRUYnOiBbXSxcbiAgICAnWENEJzogW3UsICckJ11cbiAgfSxcbiAgcGx1cmFsXG5dO1xuIl19